import type { WidgetMapper } from "@/widgets/core/mapper.ts";
import { createElement, lazy } from "react";
import {
  TODO_LIST_WIDGET_TYPE,
  type TodoListWidget,
  type TodoListWidgetConfig,
} from "@/widgets/todoList/widget.type.ts";

// Lazy load the TodoList component
const lazyComponent = lazy(() => import("./widget.component.tsx"));

/**
 * Maps a widget configuration to an TodoListWidget instance.
 *
 * If the widget configuration does not correspond to a `TodoListWidget`,
 *  this mapper return `null`.
 *
 * @param config - The widget configuration to map from
 * @returns The mapped TodoListWidget instance, or `null` if not applicable
 */
export const TodoListWidgetMapper: WidgetMapper = config => {
  // check based on type field
  if (config.type !== TODO_LIST_WIDGET_TYPE) {
    return null;
  }

  const widget: TodoListWidget = {
    ...(config as TodoListWidgetConfig),
    type: TODO_LIST_WIDGET_TYPE,

    render() {
      return createElement(lazyComponent, { widget: this });
    },
  };

  return widget;
};
