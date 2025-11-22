import { useEffect, useState } from "react";

/**
 * Get the value of a url param by key.
 * @param key The key of the url param to access.
 * @returns The value of the url param or null if not found.
 */
const getParamValue = (key: string) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(key) ?? undefined;
};

/**
 * Custom hook to access the url param under specific key.
 *
 * @param key The key of the url param to access.
 * @param defaultValue Optional default value to return if the url param is not found.
 * @returns The value of the url param or the default value.
 */
export function useUrlParam(key: string, defaultValue: string): string;
export function useUrlParam(key: string): string | undefined;
export function useUrlParam(key: string, defaultValue?: string): string | undefined {
  const [paramValue, setParamValue] = useState(getParamValue(key) ?? defaultValue);

  // Sync URL state with component state
  useEffect(() => {
    const handleUrlChange = () => {
      const newValue = getParamValue(key);
      if (newValue !== paramValue) {
        setParamValue(newValue ?? defaultValue);
      }
    };

    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("pushState", handleUrlChange);
    window.addEventListener("replaceState", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("pushState", handleUrlChange);
      window.removeEventListener("replaceState", handleUrlChange);
    };
  }, [key, paramValue, defaultValue]);

  return paramValue;
}
