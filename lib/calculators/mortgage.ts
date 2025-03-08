import { MortgageCalculation, MortgageResult, AmortizationEntry } from '@/types/calculator';

export function calculateMortgage(data: MortgageCalculation): MortgageResult {
  const {
    principal,
    interestRate,
    loanTerm,
    downPayment,
    propertyTax = 0,
    insurance = 0,
  } = data;

  // Calculate loan amount after down payment
  const loanAmount = principal - downPayment;

  // Convert annual interest rate to monthly
  const monthlyRate = interestRate / 100 / 12;

  // Calculate number of monthly payments
  const numberOfPayments = loanTerm * 12;

  // Calculate monthly principal and interest payment using the mortgage payment formula
  // P = L[c(1 + c)^n]/[(1 + c)^n - 1]
  // where: P = monthly payment, L = loan amount, c = monthly interest rate, n = number of payments
  const monthlyPrincipalAndInterest =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  // Add monthly property tax and insurance
  const monthlyPayment = monthlyPrincipalAndInterest + propertyTax / 12 + insurance / 12;

  // Calculate amortization schedule
  const amortizationSchedule: AmortizationEntry[] = [];
  let remainingBalance = loanAmount;
  let totalInterest = 0;

  for (let month = 1; month <= numberOfPayments; month++) {
    // Calculate interest for this month
    const interestPayment = remainingBalance * monthlyRate;
    totalInterest += interestPayment;

    // Calculate principal for this month
    const principalPayment = monthlyPrincipalAndInterest - interestPayment;

    // Update remaining balance
    remainingBalance -= principalPayment;

    // Add entry to amortization schedule
    amortizationSchedule.push({
      month,
      payment: monthlyPrincipalAndInterest,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, remainingBalance), // Ensure balance doesn't go below 0 due to rounding
    });
  }

  // Calculate total payment over the life of the loan
  const totalPayment = monthlyPayment * numberOfPayments;

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    amortizationSchedule,
  };
} 