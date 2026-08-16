"use client";

/**
 * useAsync Hook
 * Generic async operation handler with loading, error, and data states
 */

import { useState, useCallback, useRef } from "react";

interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface UseAsyncReturn<T> extends AsyncState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

export function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  immediate: boolean = false
): UseAsyncReturn<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  });

  const isMounted = useRef(true);

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const data = await asyncFunction(...args);
        if (isMounted.current) {
          setState({ data, isLoading: false, error: null });
        }
        return data;
      } catch (error) {
        if (isMounted.current) {
          setState({ data: null, isLoading: false, error: error as Error });
        }
        return null;
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}
