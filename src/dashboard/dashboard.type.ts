import type { WidgetConfig } from "@/widgets/core/widget.type.ts";

/**
 * Dynamic dashboard configuration interface.
 */
export interface DashboardConfig {
  /**
   * Title of the dashboard.
   * In this case, ID = Title, to reduce complexity.
   * In real application, ID must be separate and unique.
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
   * Whether the dashboard is locked for editing (drag-and-drop disabled)
   */
  locked: boolean;

  /**
   * Widget configurations included in the dashboard
   */
  widgets: WidgetConfig[];
}

export const DEFAULT_DASHBOARD_CONFIG: DashboardConfig = {
  title: "Unnamed Dashboard",
  panelColumns: 2,
  widgetHeight: 250,
  locked: false,
  widgets: [] as WidgetConfig[],
};
