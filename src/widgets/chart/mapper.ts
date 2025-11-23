import type { WidgetMapper } from "@/widgets/core/mapper.ts";
import { createElement, lazy } from "react";
import {
  CHART_WIDGET_TYPE,
  type ChartWidget,
  type ChartWidgetConfig,
} from "@/widgets/chart/widget.type.ts";

// Lazy load the Chart component
const lazyComponent = lazy(() => import("./widget.component.tsx"));

/**
 * Maps a widget configuration to a ChartWidget instance.
 *
 * If the widget configuration does not correspond to a `ChartWidget`,
 *  this mapper returns `null`.
 *
 * @param config - The widget configuration to map from
 * @returns The mapped ChartWidget instance, or `null` if not applicable
 */
export const ChartWidgetMapper: WidgetMapper = config => {
  // check based on type field
  if (config.type !== CHART_WIDGET_TYPE) {
    return null;
  }

  const widget: ChartWidget = {
    ...(config as ChartWidgetConfig),
    type: CHART_WIDGET_TYPE,

    render() {
      return createElement(lazyComponent, { widget: this });
    },
  };

  return widget;
};
