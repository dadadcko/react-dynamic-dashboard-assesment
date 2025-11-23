import type { Widget, WidgetConfigWithRemoteData } from "@/widgets/core/widget.type.ts";

export const TABLE_WIDGET_TYPE = "table";

/**
 * Definition of the table columns.
 */
export interface TableWidgetColumnDefinition {
  /**
   * The key of the column, corresponding to the data field.
   *
   * Supports nested keys using dot notation (e.g., 'data.items.0.name')
   */
  key: string;

  /**
   * Human-readable label for the column.
   * If empty, the key will be used as the label.
   */
  label?: string;
}

export interface TableWidgetConfig extends WidgetConfigWithRemoteData {
  type: typeof TABLE_WIDGET_TYPE;

  /**
   * Whether the table should have striped rows.
   */
  stripped?: boolean;

  /**
   * Table columns definition.
   */
  columns: TableWidgetColumnDefinition[];
}

/**
 * Represents a TableWidget widget.
 */
export type TableWidget = Widget & TableWidgetConfig;

/**
 * Data type for the table.
 */
export type TableData = Record<string, unknown>;
