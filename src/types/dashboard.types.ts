import type { WidgetConfig } from "@/types/widget.types.ts";

/**
 * Dynamic dashboard configuration interface.
 */
export interface DashboardConfig {
  /**
   * Title of the dashboard
   */
  title: string;

  /**
   * Number of columns in the dashboard layout
   *
   * Note this number only applies on larger screens.
   * On smaller screens, the layout will adjust responsively.
   */
  panelColumns: number;

  /**
   * Height of each widget in pixels
   */
  widgetHeight: number;

  /**
   * Widget configurations included in the dashboard
   */
  widgets: WidgetConfig[];
}
