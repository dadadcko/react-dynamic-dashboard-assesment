import { useContext } from "react";
import type { WidgetMapper } from "@/services/WidgetMapper.ts";
import { WidgetMapperContext } from "@/contexts/WidgetMapperContext.ts";

/**
 * Custom hook to access the WidgetMapperContext.
 * @returns instance of {@link WidgetMapper} service from context
 */
export function useWidgetMapper(): WidgetMapper {
  return useContext(WidgetMapperContext);
}
