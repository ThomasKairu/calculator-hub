import { useState, useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';

interface CalculatorState<T> {
  input: T;
  result: any;
  history: Array<{
    input: T;
    result: any;
    timestamp: number;
  }>;
  error: string | null;
  isLoading: boolean;
}

interface CalculatorOptions<T> {
  storageKey?: string;
  maxHistoryItems?: number;
  initialState?: Partial<CalculatorState<T>>;
  calculate: (input: T) => Promise<any>;
}

export function useCalculator<T>({
  storageKey,
  maxHistoryItems = 10,
  initialState = {},
  calculate,
}: CalculatorOptions<T>) {
  // Initialize state with localStorage if available
  const [state, setState] = useState<CalculatorState<T>>(() => ({
    input: {} as T,
    result: null,
    history: [],
    error: null,
    isLoading: false,
    ...initialState,
  }));

  // Use localStorage for history if storageKey is provided
  const [savedHistory, setSavedHistory] = useLocalStorage<
    Array<{
      input: T;
      result: any;
      timestamp: number;
    }>
  >(storageKey ? `calculator_history_${storageKey}` : null, []);

  // Update input
  const setInput = useCallback((input: Partial<T>) => {
    setState((prev) => ({
      ...prev,
      input: { ...prev.input, ...input },
      error: null,
    }));
  }, []);

  // Clear state
  const clear = useCallback(() => {
    setState((prev) => ({
      ...prev,
      input: {} as T,
      result: null,
      error: null,
    }));
  }, []);

  // Clear history
  const clearHistory = useCallback(() => {
    setState((prev) => ({ ...prev, history: [] }));
    if (storageKey) {
      setSavedHistory([]);
    }
  }, [storageKey, setSavedHistory]);

  // Perform calculation
  const calculateResult = useCallback(
    async (input: T) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const result = await calculate(input);

        // Add to history
        const historyEntry = {
          input,
          result,
          timestamp: Date.now(),
        };

        const newHistory = [historyEntry, ...state.history].slice(
          0,
          maxHistoryItems
        );

        setState((prev) => ({
          ...prev,
          result,
          history: newHistory,
          isLoading: false,
        }));

        // Update localStorage if needed
        if (storageKey) {
          setSavedHistory(newHistory);
        }

        return result;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Calculation failed',
          isLoading: false,
        }));
        throw error;
      }
    },
    [calculate, maxHistoryItems, setSavedHistory, state.history, storageKey]
  );

  return {
    state,
    setInput,
    calculate: calculateResult,
    clear,
    clearHistory,
  };
} 