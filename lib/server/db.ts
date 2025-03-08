import { Pool, PoolConfig, QueryResult } from 'pg';

// Database configuration
const dbConfig: PoolConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true',
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
};

// Create connection pool
const pool = new Pool(dbConfig);

// Query interface
interface QueryOptions {
  text: string;
  values?: any[];
  name?: string;
}

// Error handling
class DatabaseError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

// Execute query
export async function query<T = any>(
  options: QueryOptions
): Promise<QueryResult<T>> {
  const client = await pool.connect();

  try {
    return await client.query(options);
  } catch (error: any) {
    throw new DatabaseError(
      error.message || 'Database query failed',
      error.code
    );
  } finally {
    client.release();
  }
}

// Transaction helper
export async function transaction<T>(
  callback: (client: any) => Promise<T>
): Promise<T> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// Health check
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await query({ text: 'SELECT 1' });
    return true;
  } catch {
    return false;
  }
}

// Prepared statements
export const preparedStatements = {
  insertCalculation: {
    name: 'insert_calculation',
    text: `
      INSERT INTO calculations (
        type,
        input_data,
        result,
        user_id,
        created_at
      ) VALUES ($1, $2, $3, $4, NOW())
      RETURNING id
    `,
  },
  getCalculationHistory: {
    name: 'get_calculation_history',
    text: `
      SELECT *
      FROM calculations
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `,
  },
  updateUserPreferences: {
    name: 'update_user_preferences',
    text: `
      UPDATE users
      SET preferences = $2
      WHERE id = $1
      RETURNING id
    `,
  },
};

// Migration helper
export async function runMigrations(): Promise<void> {
  await transaction(async (client) => {
    // Create migrations table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        applied_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Add your migrations here
    const migrations = [
      {
        name: 'create_users_table',
        sql: `
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            preferences JSONB DEFAULT '{}'::jsonb
          )
        `,
      },
      {
        name: 'create_calculations_table',
        sql: `
          CREATE TABLE IF NOT EXISTS calculations (
            id SERIAL PRIMARY KEY,
            type VARCHAR(50) NOT NULL,
            input_data JSONB NOT NULL,
            result JSONB NOT NULL,
            user_id INTEGER REFERENCES users(id),
            created_at TIMESTAMP DEFAULT NOW()
          )
        `,
      },
    ];

    // Run each migration
    for (const migration of migrations) {
      const { rowCount } = await client.query(
        'SELECT 1 FROM migrations WHERE name = $1',
        [migration.name]
      );

      if (rowCount === 0) {
        await client.query(migration.sql);
        await client.query(
          'INSERT INTO migrations (name) VALUES ($1)',
          [migration.name]
        );
      }
    }
  });
}

// Cleanup
process.on('exit', () => {
  pool.end();
}); 