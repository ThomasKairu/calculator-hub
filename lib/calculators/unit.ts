import { conversionFactors } from '@/lib/constants/units';

export function convertUnit(
  value: number,
  fromUnit: string,
  toUnit: string,
  category: string
): number {
  // If units are the same, return the original value
  if (fromUnit === toUnit) {
    return value;
  }

  const factors = conversionFactors[category];
  if (!factors) {
    throw new Error(`Unknown category: ${category}`);
  }

  // Convert to base unit first
  const baseValue = value * (factors[fromUnit]?.toBase ?? 1);
  
  // Convert from base unit to target unit
  const targetFactor = factors[toUnit]?.fromBase ?? 1;
  return baseValue * targetFactor;
} 