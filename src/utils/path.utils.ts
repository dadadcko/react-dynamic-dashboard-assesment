/**
 * Safely gets a nested property from an object using a string path (supports dot notation).
 *
 * @example getByPath(obj, 'a.b.c.1.d')
 * @param obj The object to query
 * @param path The string path (e.g. 'a.b.c.1.d')
 * @returns The value at the path, or undefined if not found
 */
export function getByPath<T = unknown>(obj: unknown, path: string): T | undefined {
  if (!path) {
    return obj as T;
  }

  return path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && (typeof acc === "object" || Array.isArray(acc))
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      obj,
    ) as T | undefined;
}
