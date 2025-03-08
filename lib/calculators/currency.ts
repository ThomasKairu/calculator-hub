import { CurrencyResult } from '@/types/calculator';

interface CurrencyData {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}

interface ExchangeRateResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: {
    [key: string]: number;
  };
}

interface CurrencyInfo {
  id: string;
  name: string;
  symbol?: string;
  flag?: string;
}

export const supportedCurrencies: CurrencyInfo[] = [
  // Major world currencies
  { id: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { id: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { id: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { id: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { id: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { id: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { id: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { id: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { id: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  
  // Asian currencies
  { id: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  { id: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { id: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { id: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
  { id: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { id: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
  { id: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
  { id: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  { id: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳' },
  { id: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', flag: '🇹🇼' },
  { id: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
  { id: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩' },
  { id: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', flag: '🇱🇰' },
  { id: 'MMK', name: 'Myanmar Kyat', symbol: 'K', flag: '🇲🇲' },
  { id: 'KHR', name: 'Cambodian Riel', symbol: '៛', flag: '🇰🇭' },
  { id: 'LAK', name: 'Lao Kip', symbol: '₭', flag: '🇱🇦' },
  
  // European currencies
  { id: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { id: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { id: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  { id: 'PLN', name: 'Polish Złoty', symbol: 'zł', flag: '🇵🇱' },
  { id: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
  { id: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
  { id: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴' },
  { id: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬' },
  { id: 'HRK', name: 'Croatian Kuna', symbol: 'kn', flag: '🇭🇷' },
  { id: 'ISK', name: 'Icelandic Króna', symbol: 'kr', flag: '🇮🇸' },
  { id: 'RSD', name: 'Serbian Dinar', symbol: 'дин', flag: '🇷🇸' },
  { id: 'ALL', name: 'Albanian Lek', symbol: 'L', flag: '🇦🇱' },
  { id: 'MKD', name: 'Macedonian Denar', symbol: 'ден', flag: '🇲🇰' },
  { id: 'MDL', name: 'Moldovan Leu', symbol: 'L', flag: '🇲🇩' },
  { id: 'BAM', name: 'Bosnia-Herzegovina Mark', symbol: 'KM', flag: '🇧🇦' },
  
  // Middle Eastern currencies
  { id: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { id: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
  { id: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق', flag: '🇶🇦' },
  { id: 'OMR', name: 'Omani Rial', symbol: 'ر.ع.', flag: '🇴🇲' },
  { id: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب', flag: '🇧🇭' },
  { id: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼' },
  { id: 'ILS', name: 'Israeli New Shekel', symbol: '₪', flag: '🇮🇱' },
  { id: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا', flag: '🇯🇴' },
  { id: 'LBP', name: 'Lebanese Pound', symbol: 'ل.ل', flag: '🇱🇧' },
  { id: 'EGP', name: 'Egyptian Pound', symbol: 'ج.م', flag: '🇪🇬' },
  { id: 'IQD', name: 'Iraqi Dinar', symbol: 'ع.د', flag: '🇮🇶' },
  { id: 'IRR', name: 'Iranian Rial', symbol: '﷼', flag: '🇮🇷' },
  { id: 'YER', name: 'Yemeni Rial', symbol: '﷼', flag: '🇾🇪' },
  
  // African currencies
  { id: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { id: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
  { id: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
  { id: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭' },
  { id: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', flag: '🇺🇬' },
  { id: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿' },
  { id: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', flag: '🇪🇹' },
  { id: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', flag: '🇲🇦' },
  { id: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج', flag: '🇩🇿' },
  { id: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت', flag: '🇹🇳' },
  { id: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK', flag: '🇿🇲' },
  { id: 'RWF', name: 'Rwandan Franc', symbol: 'FRw', flag: '🇷🇼' },
  { id: 'MWK', name: 'Malawian Kwacha', symbol: 'MK', flag: '🇲🇼' },
  { id: 'MUR', name: 'Mauritian Rupee', symbol: '₨', flag: '🇲🇺' },
  { id: 'NAD', name: 'Namibian Dollar', symbol: 'N$', flag: '🇳🇦' },
  
  // American currencies
  { id: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  { id: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { id: 'ARS', name: 'Argentine Peso', symbol: '$', flag: '🇦🇷' },
  { id: 'CLP', name: 'Chilean Peso', symbol: '$', flag: '🇨🇱' },
  { id: 'COP', name: 'Colombian Peso', symbol: '$', flag: '🇨🇴' },
  { id: 'PEN', name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪' },
  { id: 'UYU', name: 'Uruguayan Peso', symbol: '$U', flag: '🇺🇾' },
  { id: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs.', flag: '🇧🇴' },
  { id: 'PYG', name: 'Paraguayan Guarani', symbol: '₲', flag: '🇵🇾' },
  { id: 'VES', name: 'Venezuelan Bolívar', symbol: 'Bs.', flag: '🇻🇪' },
  { id: 'CRC', name: 'Costa Rican Colón', symbol: '₡', flag: '🇨🇷' },
  { id: 'GTQ', name: 'Guatemalan Quetzal', symbol: 'Q', flag: '🇬🇹' },
  { id: 'DOP', name: 'Dominican Peso', symbol: 'RD$', flag: '🇩🇴' },
  { id: 'HNL', name: 'Honduran Lempira', symbol: 'L', flag: '🇭🇳' },
  { id: 'NIO', name: 'Nicaraguan Córdoba', symbol: 'C$', flag: '🇳🇮' },
  
  // Pacific currencies
  { id: 'FJD', name: 'Fiji Dollar', symbol: 'FJ$', flag: '🇫🇯' },
  { id: 'PGK', name: 'Papua New Guinean Kina', symbol: 'K', flag: '🇵🇬' },
  { id: 'SBD', name: 'Solomon Islands Dollar', symbol: 'SI$', flag: '🇸🇧' },
  { id: 'TOP', name: 'Tongan Paʻanga', symbol: 'T$', flag: '🇹🇴' },
  { id: 'VUV', name: 'Vanuatu Vatu', symbol: 'VT', flag: '🇻🇺' },
  { id: 'WST', name: 'Samoan Tala', symbol: 'WS$', flag: '🇼🇸' }
];

const API_KEY = '86d4b464d0ecd7c7e7d24356';
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

export async function convertCurrency({ amount, fromCurrency, toCurrency }: CurrencyData): Promise<CurrencyResult> {
  try {
    console.log('Making API request with:', { amount, fromCurrency, toCurrency });
    
    // Use a proxy endpoint to avoid CORS issues
    const response = await fetch('/api/exchange-rates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fromCurrency,
        toCurrency,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
    }

    const data: ExchangeRateResponse = await response.json();
    console.log('API Response:', data);
    
    const rate = data.conversion_rates[toCurrency];

    if (!rate) {
      throw new Error(`Exchange rate not found for ${toCurrency}`);
    }

    // Ensure amount is a number and calculate the converted amount
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
      throw new Error('Invalid amount provided');
    }

    const convertedAmount = numericAmount * rate;
    console.log('Conversion result:', { numericAmount, rate, convertedAmount });
    
    return {
      amount: convertedAmount,
      fromCurrency,
      toCurrency,
      rate
    };
  } catch (error) {
    console.error('Currency conversion error:', error);
    throw error;
  }
}

// Export additional currency-related utilities
export const getCurrencySymbol = (currencyId: string): string => {
  const currency = supportedCurrencies.find(c => c.id === currencyId);
  return currency?.symbol || currencyId;
};

export const getCurrencyName = (currencyId: string): string => {
  const currency = supportedCurrencies.find(c => c.id === currencyId);
  return currency?.name || currencyId;
}; 