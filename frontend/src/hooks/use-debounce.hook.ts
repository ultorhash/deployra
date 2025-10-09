import { useEffect, useState } from "react";

/**
 * Returns a debounced version of the input value.
 * Useful for delaying updates from fast-changing inputs like search fields.
 *
 * @param value The input value to debounce
 * @param delay Delay in milliseconds before updating (default: 300ms)
 * @returns Debounced value
 */
export const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
};
