// Currency Calculator Types
export interface CurrencyConversion {
  amount: number;
  from: string;
  to: string;
}

export interface CurrencyResult {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
}

export interface ExchangeRate {
  rate: number;
  timestamp: number;
  source: string;
}

// Unit Calculator Types
export interface UnitConversion {
  amount: number;
  category: string;
  from: string;
  to: string;
}

export interface UnitCategory {
  id: string;
  name: string;
  baseUnit: string;
}

export interface Unit {
  id: string;
  name: string;
}

export interface ConversionFactor {
  toBase: number;
  fromBase: number;
}

// Mortgage Calculator Types
export interface MortgageCalculation {
  principal: number;
  interestRate: number;
  loanTerm: number;
  downPayment: number;
  propertyTax?: number;
  insurance?: number;
}

export interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationEntry[];
}

export interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

// BMI Calculator Types
export interface BMICalculation {
  height: number;
  weight: number;
  unit: 'metric' | 'imperial';
  age: number;
  gender: 'male' | 'female';
}

export interface BMIResult {
  bmi: number;
  category: BMICategory;
  healthyRangeMin: number;
  healthyRangeMax: number;
  recommendations: string[];
}

export type BMICategory =
  | 'underweight'
  | 'normal'
  | 'overweight'
  | 'obese'
  | 'severely_obese'; 