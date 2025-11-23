import type { Widget, WidgetConfig } from "@/widgets/core/widget.type.ts";
import { useContext, useMemo } from "react";
import { WidgetDynamicTypeContext } from "@/widgets/core/context.ts";

/**
 * Maps widget configurations to widget instances.
 *
 * @param config - The widget configuration to map from
 * @returns The mapped widget instance or null if mapping is not possible
 */
export type WidgetMapper = (config: WidgetConfig) => Widget | null;

// INTERNAL - always throw mapper implementation that throws when called
// This is used as LAST in chain to ensure developer does not remove all mappers
const alwaysThrowMapper: WidgetMapper = () => {
  throw new Error("Widget mapper chain exhausted: no mapper could handle the given configuration");
};

/**
 * Hook to get chained widget mappers from context.
 *
 * It creates a chain of mappers under the same interface,
 *  allowing consumer to simply call one function, given by this hook.
 *
 * @returns A chained widget mapper function
 */
export function useChainedWidgetMapper() {
  const ctx = useContext(WidgetDynamicTypeContext);

  // create a chain from provided mappers
  // Wrapped in memo just to be sure (in case React compiler doesn't optimize it)
  return useMemo(() => {
    // Reduce the mappers into a single one
    // When chain is called, the last mapper is called first
    // When a mapper returns not-null, the chain forwards-only that result back since then
    return ctx
      .map(c => c.mapper)
      .reduce((next, current) => cfg => current(cfg) ?? next(cfg), alwaysThrowMapper);
  }, [ctx]);
}
