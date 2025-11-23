import type { WidgetMapper } from "@/widgets/core/mapper.ts";
import { createElement, lazy } from "react";
import type { UnknownWidget } from "@/widgets/core/unknown/widget.type.ts";

// Lazy load the UnknownWidget component
const lazyComponent = lazy(() => import("./widget.component.tsx"));

/**
 * Maps a widget configuration to an UnknownWidget instance.
 *
 * This mapper Always returns an UnknownWidget, which serves as a fallback.
 * It should be used as **LAST** in the mapper chain.
 *
 * @param config - The widget configuration to map from
 *
 */
export const UnknownWidgetMapper: WidgetMapper = config => {
  const widget: UnknownWidget = {
    ...config,
    type: "unknown",
    originalType: config?.type ?? "not-specified",

    // Lazy load the UnknownWidget component
    render() {
      return createElement(lazyComponent, { widget: this });
    },
  };

  return widget;
};
