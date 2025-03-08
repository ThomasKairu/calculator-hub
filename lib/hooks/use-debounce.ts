import { useState, useEffect, useCallback } from 'react';

// Debounce a value
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Debounce a function
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps: any[] = []
) {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        callback(...args);
      }, delay);

      setTimeoutId(newTimeoutId);
    },
    [callback, delay, ...deps]
  );
}

// Debounce a function with leading and trailing options
interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
}

export function useDebouncedCallbackAdvanced<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  options: DebounceOptions = {},
  deps: any[] = []
) {
  const { leading = false, trailing = true } = options;
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [lastArgs, setLastArgs] = useState<Parameters<T>>();

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (leading && !timeoutId) {
        callback(...args);
      } else if (trailing) {
        setLastArgs(args);
      }

      const newTimeoutId = setTimeout(() => {
        if (trailing && lastArgs) {
          callback(...lastArgs);
        }
        setTimeoutId(undefined);
        setLastArgs(undefined);
      }, delay);

      setTimeoutId(newTimeoutId);
    },
    [callback, delay, leading, trailing, ...deps]
  );
} 