import { create } from 'zustand';
import { useQuery } from '@tanstack/react-query';
import { userAPI } from '../services/api';
import React from 'react';

interface CurrencyState {
  currency: string;
  setCurrency: (currency: string) => void;
  convertAmount: (amount: number, fromCurrency: string) => number;
}

const SUPPORTED_CURRENCIES = ['PHP', 'EUR', 'USD', 'GBP', 'CAD', 'CHF', 'JPY', 'AUD'];

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  currency: 'PHP',
  
  setCurrency: (currency) => {
    set({ currency });
    localStorage.setItem('preferredCurrency', currency);
  },
  
  convertAmount: (amount: number, fromCurrency: string) => {
    const { currency: toCurrency } = get();
    if (fromCurrency === toCurrency) return amount;
    
    const rates: { [key: string]: number } = {
      PHP: 1,       
      EUR: 0.0163,
      USD: 0.0175,  
      GBP: 0.0138,   
      CAD: 0.0238,   
      CHF: 0.0154,   
      JPY: 2.625,    
      AUD: 0.0268,   
    };
    
    const rate = rates[toCurrency] / rates[fromCurrency];
    return amount * rate;
  }
}));

export const useCurrency = () => {
  const { data: user } = useQuery({
    queryKey: ['profile'],
    queryFn: userAPI.getProfile,
  });

  const { currency, setCurrency, convertAmount } = useCurrencyStore();

  React.useEffect(() => {
    if (user?.currency) {
      setCurrency(user.currency);
    }
  }, [user?.currency, setCurrency]);

  return {
    currency,
    setCurrency,
    convertAmount,
    supportedCurrencies: SUPPORTED_CURRENCIES,
    
    formatAmount: (amount: number, originalCurrency?: string) => {
      const finalAmount = originalCurrency ? convertAmount(amount, originalCurrency) : amount;
      const symbol = getCurrencySymbol(currency);
      return `${symbol} ${finalAmount.toFixed(2)}`;
    },
    
    formatAmountWithOriginal: (originalAmount: number, originalCurrency: string) => {
      const symbol = getCurrencySymbol(currency);
      const converted = convertAmount(originalAmount, originalCurrency);
      
      if (originalCurrency === currency) {
        return `${symbol} ${originalAmount.toFixed(2)}`;
      }
      
      const originalSymbol = getCurrencySymbol(originalCurrency);
      return `${symbol} ${converted.toFixed(2)} (${originalSymbol} ${originalAmount.toFixed(2)})`;
    }
  };
};

const getCurrencySymbol = (currency: string) => {
  const symbols: { [key: string]: string } = {
    PHP: '₱',
    EUR: '€',
    USD: '$',
    GBP: '£',
    CAD: 'C$',
    CHF: 'CHF',
    JPY: '¥',
    AUD: 'A$'
  };
  return symbols[currency] || currency;
};