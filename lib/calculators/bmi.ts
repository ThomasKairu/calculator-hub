import { BMICalculation, BMIResult, BMICategory } from '@/types/calculator';

export function calculateBMI(data: BMICalculation): BMIResult {
  const { height, weight, unit, age, gender } = data;

  // Convert measurements to metric if needed
  const heightInMeters = unit === 'metric' ? height / 100 : (height * 2.54) / 100;
  const weightInKg = unit === 'metric' ? weight : weight * 0.453592;

  // Calculate BMI
  const bmi = weightInKg / (heightInMeters * heightInMeters);

  // Determine BMI category
  let category: BMICategory;
  if (bmi < 18.5) {
    category = 'underweight';
  } else if (bmi < 25) {
    category = 'normal';
  } else if (bmi < 30) {
    category = 'overweight';
  } else if (bmi < 35) {
    category = 'obese';
  } else {
    category = 'severely_obese';
  }

  // Calculate healthy weight range
  const healthyRangeMin = 18.5 * (heightInMeters * heightInMeters);
  const healthyRangeMax = 24.9 * (heightInMeters * heightInMeters);

  // Generate recommendations based on BMI category, age, and gender
  const recommendations: string[] = [];

  // Basic recommendations based on BMI category
  switch (category) {
    case 'underweight':
      recommendations.push(
        'Consult with a healthcare provider about your weight',
        'Focus on nutrient-dense foods',
        'Consider strength training to build muscle mass',
        'Eat more frequent, smaller meals throughout the day'
      );
      break;
    case 'normal':
      recommendations.push(
        'Maintain your healthy lifestyle',
        'Regular exercise (150 minutes of moderate activity per week)',
        'Balanced diet with plenty of fruits and vegetables',
        'Regular health check-ups'
      );
      break;
    case 'overweight':
      recommendations.push(
        'Aim for gradual weight loss of 0.5-1 kg per week',
        'Increase physical activity',
        'Monitor portion sizes',
        'Focus on whole, unprocessed foods'
      );
      break;
    case 'obese':
    case 'severely_obese':
      recommendations.push(
        'Consult with healthcare providers for a personalized plan',
        'Consider working with a registered dietitian',
        'Start with low-impact exercises',
        'Monitor other health markers (blood pressure, blood sugar, etc.)'
      );
      break;
  }

  // Age-specific recommendations
  if (age < 18) {
    recommendations.push('Consult with a pediatrician for age-appropriate guidance');
  } else if (age > 65) {
    recommendations.push(
      'Focus on maintaining muscle mass through strength training',
      'Ensure adequate calcium and vitamin D intake'
    );
  }

  // Gender-specific recommendations
  if (gender === 'female') {
    recommendations.push(
      'Ensure adequate iron intake',
      'Include calcium-rich foods for bone health'
    );
  } else {
    recommendations.push(
      'Focus on protein intake for muscle maintenance',
      'Regular cardiovascular exercise'
    );
  }

  return {
    bmi,
    category,
    healthyRangeMin,
    healthyRangeMax,
    recommendations,
  };
} 