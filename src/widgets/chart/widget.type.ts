import type { Widget, WidgetConfigWithRemoteData } from "@/widgets/core/widget.type.ts";

export const CHART_WIDGET_TYPE = "chart";

interface ChartDataSeriesDefinition {
  /**
   * The key of the data series.
   * Supports nested keys using dot notation (e.g., 'data.items.0.name')
   */
  key: string;

  /**
   * Human-readable label for the series.
   * If empty, the key will be used as the label.
   */
  label?: string;

  /**
   * Color of the series in the chart.
   * If empty, a default color will be assigned.
   */
  color?: string;
}

export interface ChartWidgetConfig extends WidgetConfigWithRemoteData {
  type: typeof CHART_WIDGET_TYPE;

  /**
   * The key for the x-axis data.
   */
  xAxisKey: string;

  /**
   * Human-readable label for the x-axis.
   */
  xAxisLabel?: string;

  /**
   * Human-readable label for the y-axis.
   */
  yAxisLabel?: string;

  /**
   * Definitions for the data series to be displayed in the chart.
   */
  series: ChartDataSeriesDefinition[];
}

/**
 * Represents a ChartWidget widget.
 */
export type ChartWidget = Widget & ChartWidgetConfig;

/**
 * Data type for the chart.
 */
export type ChartData = Record<string, unknown>;
