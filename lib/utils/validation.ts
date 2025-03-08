// Basic validations
export function isRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return !isNaN(value);
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
}

export function isEmail(value: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(value);
}

export function isURL(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

// Number validations
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isInteger(value: number): boolean {
  return Number.isInteger(value);
}

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function isPositive(value: number): boolean {
  return value > 0;
}

export function isNegative(value: number): boolean {
  return value < 0;
}

// String validations
export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
}

export function matchesPattern(value: string, pattern: RegExp): boolean {
  return pattern.test(value);
}

// Date validations
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

export function isFutureDate(value: Date): boolean {
  return value.getTime() > Date.now();
}

export function isPastDate(value: Date): boolean {
  return value.getTime() < Date.now();
}

export function isWithinDateRange(
  value: Date,
  startDate: Date,
  endDate: Date
): boolean {
  return value >= startDate && value <= endDate;
}

// Array validations
export function hasMinItems<T>(array: T[], minItems: number): boolean {
  return array.length >= minItems;
}

export function hasMaxItems<T>(array: T[], maxItems: number): boolean {
  return array.length <= maxItems;
}

export function hasUniqueItems<T>(array: T[]): boolean {
  return new Set(array).size === array.length;
}

// Object validations
export function hasRequiredFields<T extends object>(
  obj: T,
  requiredFields: (keyof T)[]
): boolean {
  return requiredFields.every((field) => isRequired(obj[field]));
}

// Custom validations for calculator inputs
export function isValidCurrencyAmount(value: number): boolean {
  return isNumber(value) && isPositive(value) && value <= 999999999.99;
}

export function isValidInterestRate(value: number): boolean {
  return isNumber(value) && isInRange(value, 0, 100);
}

export function isValidLoanTerm(value: number): boolean {
  return isNumber(value) && isInteger(value) && isInRange(value, 1, 50);
}

export function isValidBMI(value: number): boolean {
  return isNumber(value) && isInRange(value, 10, 50);
}

// Validation result type
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
} 