interface Unit {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  baseUnit: string;
}

interface ConversionFactor {
  toBase: number;
  fromBase: number;
}

export const unitCategories: Category[] = [
  { id: 'length', name: 'Length', baseUnit: 'meter' },
  { id: 'mass', name: 'Mass', baseUnit: 'kilogram' },
  { id: 'temperature', name: 'Temperature', baseUnit: 'celsius' },
  { id: 'volume', name: 'Volume', baseUnit: 'liter' },
  { id: 'area', name: 'Area', baseUnit: 'square_meter' },
];

const units: Record<string, Unit[]> = {
  length: [
    { id: 'meter', name: 'Meter' },
    { id: 'kilometer', name: 'Kilometer' },
    { id: 'centimeter', name: 'Centimeter' },
    { id: 'millimeter', name: 'Millimeter' },
    { id: 'inch', name: 'Inch' },
    { id: 'foot', name: 'Foot' },
    { id: 'yard', name: 'Yard' },
    { id: 'mile', name: 'Mile' },
  ],
  mass: [
    { id: 'kilogram', name: 'Kilogram' },
    { id: 'gram', name: 'Gram' },
    { id: 'milligram', name: 'Milligram' },
    { id: 'pound', name: 'Pound' },
    { id: 'ounce', name: 'Ounce' },
    { id: 'ton', name: 'Metric Ton' },
  ],
  temperature: [
    { id: 'celsius', name: 'Celsius' },
    { id: 'fahrenheit', name: 'Fahrenheit' },
    { id: 'kelvin', name: 'Kelvin' },
  ],
  volume: [
    { id: 'liter', name: 'Liter' },
    { id: 'milliliter', name: 'Milliliter' },
    { id: 'cubic_meter', name: 'Cubic Meter' },
    { id: 'gallon', name: 'Gallon (US)' },
    { id: 'quart', name: 'Quart (US)' },
    { id: 'pint', name: 'Pint (US)' },
    { id: 'cup', name: 'Cup (US)' },
  ],
  area: [
    { id: 'square_meter', name: 'Square Meter' },
    { id: 'square_kilometer', name: 'Square Kilometer' },
    { id: 'square_foot', name: 'Square Foot' },
    { id: 'square_yard', name: 'Square Yard' },
    { id: 'acre', name: 'Acre' },
    { id: 'hectare', name: 'Hectare' },
  ],
};

export const conversionFactors: Record<string, Record<string, ConversionFactor>> = {
  length: {
    meter: { toBase: 1, fromBase: 1 },
    kilometer: { toBase: 1000, fromBase: 0.001 },
    centimeter: { toBase: 0.01, fromBase: 100 },
    millimeter: { toBase: 0.001, fromBase: 1000 },
    inch: { toBase: 0.0254, fromBase: 39.3701 },
    foot: { toBase: 0.3048, fromBase: 3.28084 },
    yard: { toBase: 0.9144, fromBase: 1.09361 },
    mile: { toBase: 1609.34, fromBase: 0.000621371 },
  },
  mass: {
    kilogram: { toBase: 1, fromBase: 1 },
    gram: { toBase: 0.001, fromBase: 1000 },
    milligram: { toBase: 0.000001, fromBase: 1000000 },
    pound: { toBase: 0.453592, fromBase: 2.20462 },
    ounce: { toBase: 0.0283495, fromBase: 35.274 },
    ton: { toBase: 1000, fromBase: 0.001 },
  },
  volume: {
    liter: { toBase: 1, fromBase: 1 },
    milliliter: { toBase: 0.001, fromBase: 1000 },
    cubic_meter: { toBase: 1000, fromBase: 0.001 },
    gallon: { toBase: 3.78541, fromBase: 0.264172 },
    quart: { toBase: 0.946353, fromBase: 1.05669 },
    pint: { toBase: 0.473176, fromBase: 2.11338 },
    cup: { toBase: 0.236588, fromBase: 4.22675 },
  },
  area: {
    square_meter: { toBase: 1, fromBase: 1 },
    square_kilometer: { toBase: 1000000, fromBase: 0.000001 },
    square_foot: { toBase: 0.092903, fromBase: 10.7639 },
    square_yard: { toBase: 0.836127, fromBase: 1.19599 },
    acre: { toBase: 4046.86, fromBase: 0.000247105 },
    hectare: { toBase: 10000, fromBase: 0.0001 },
  },
};

export function getUnitsForCategory(categoryId: string): Unit[] {
  return units[categoryId] || [];
} 