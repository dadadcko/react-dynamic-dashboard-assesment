import { useFetch, type UseFetchOptions, type UseFetchReturnValue } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";

/**
 * Custom hook that fetches data from a URL with a specified delay before the fetch is initiated.
 *
 * NOTE THIS IS ONLY AN EXAMPLE AND NOT INTENDED FOR PRODUCTION USE.
 * Artificial delays in data fetching can lead to poor user experience.
 *
 */
export function useDelayedFetch<T>(
  url: string,
  delay: number,
  props: UseFetchOptions = {},
): UseFetchReturnValue<T> {
  const fetchHook = useFetch<T>(url, { ...props, autoInvoke: false });
  const { refetch } = fetchHook;
  const [isLoading, setIsLoading] = useState<boolean>(fetchHook.loading);

  const delayedRefetch = useCallback(async () => {
    setIsLoading(true);
    await refetch();
    await new Promise(resolve => setTimeout(resolve, delay)).finally(() => setIsLoading(false));
  }, [delay, refetch]);

  // Automatically trigger the delayed fetch on initial mount
  useEffect(() => {
    // This is only for demonstration
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void delayedRefetch();
  }, [delayedRefetch]);

  return {
    ...fetchHook,
    loading: isLoading,
    refetch: delayedRefetch,
  };
}
