import type { WidgetMapper } from "@/widgets/core/mapper.ts";
import { createElement, lazy } from "react";
import {
  TABLE_WIDGET_TYPE,
  type TableWidget,
  type TableWidgetConfig,
} from "@/widgets/table/widget.type.ts";

// Lazy load the Table component
const lazyComponent = lazy(() => import("./widget.component.tsx"));

/**
 * Maps a widget configuration to a TableWidget instance.
 *
 * If the widget configuration does not correspond to a `TableWidget`,
 *  this mapper returns `null`.
 *
 * @param config - The widget configuration to map from
 * @returns The mapped TableWidget instance, or `null` if not applicable
 */
export const TableWidgetMapper: WidgetMapper = config => {
  if (config.type !== TABLE_WIDGET_TYPE) {
    return null;
  }

  const widget: TableWidget = {
    ...(config as TableWidgetConfig),
    type: TABLE_WIDGET_TYPE,
    render() {
      return createElement(lazyComponent, { widget: this });
    },
  };

  return widget;
};
