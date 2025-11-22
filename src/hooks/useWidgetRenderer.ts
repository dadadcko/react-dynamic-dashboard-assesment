import { useContext } from "react";
import { WidgetRendererContext } from "@/contexts/WidgetRendererContext.ts";
import type { WidgetRenderer } from "@/services/WidgetRenderer.ts";

/**
 * Custom hook to access the WidgetRendererContext.
 * @returns instance of {@link WidgetRenderer} service from context
 */
export function useWidgetRenderer(): WidgetRenderer {
  return useContext(WidgetRendererContext);
}
