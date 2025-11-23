import type { Widget, WidgetConfigWithRemoteData } from "@/widgets/core/widget.type.ts";

export const TODO_LIST_WIDGET_TYPE = "todo-list";

export interface TodoListWidgetConfig extends WidgetConfigWithRemoteData {
  type: typeof TODO_LIST_WIDGET_TYPE;
}

/**
 * Represents a TodoListWidget widget.
 */
export type TodoListWidget = Widget & TodoListWidgetConfig;

/**
 * Data interface for a single item in the todolist.
 */
export interface TodoListItem {
  id: string;
  task: string;
  completed: boolean;
}
