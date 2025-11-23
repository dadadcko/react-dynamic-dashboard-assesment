import type { WidgetConfig, WidgetConfigWithRemoteData } from "@/widgets/core/widget.type.ts";
import type { TableWidgetConfig } from "@/widgets/table/widget.type.ts";
import type { ChartWidgetConfig } from "@/widgets/chart/widget.type.ts";

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
  // widgets: [] as WidgetConfig[],
  // TODO: REMOVE THIS TESTING DATA...
  widgets: [
    {
      id: "1",
      type: "todo-list",
      title: "Daily todos",
      dataUrl: "data/todo-list.json",
      dataFetchDelay: 500,
    } as WidgetConfigWithRemoteData,
    {
      id: "2",
      type: "chart",
      title: "Visitors Overview",
      description: "Visitors overview of last year by month",
      dataUrl: "data/chart.json",
      dataFetchDelay: 2000,
      xAxisKey: "label",
      xAxisLabel: "Month",
      yAxisLabel: "Visitors count",
      series: [
        { key: "total", color: "blue", label: "Visitors" },
        { key: "unique.value", color: "green", label: "Unique Visitors" },
      ],
    } as ChartWidgetConfig,
    {
      id: "3",
      title: "Monthly Expenses",
      type: "table",
      dataUrl: "data/table.json",
      dataFetchDelay: 1200,
      dataKey: "response.data",
      stripped: true,
      columns: [
        { key: "date", label: "Date" },
        { key: "category", label: "Category" },
        { key: "amount", label: "Amount" },
      ],
    } as TableWidgetConfig,
  ],
};
