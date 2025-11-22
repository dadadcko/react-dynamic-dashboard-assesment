import type { WidgetConfig } from "@/types/widget.types.ts";

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
   * Widget configurations included in the dashboard
   */
  widgets: WidgetConfig[];
}

export const DEFAULT_DASHBOARD_CONFIG: DashboardConfig = {
  title: "Unnamed Dashboard",
  panelColumns: 2,
  widgetHeight: 250,
  // widgets: [] as WidgetConfig[],
  // TODO: REMOVE THIS TESTING DATA...
  widgets: [
    { title: "Widget 1", type: "list", id: "1" },
    { title: "Widget 2", type: "chart", id: "2", description: "This one has also description..." },
    { title: "Widget 3", type: "table", id: "3" },
  ],
};
