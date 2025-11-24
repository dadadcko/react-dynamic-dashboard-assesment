import { WidgetDynamicTypeContextProvider } from "@/widgets/core/context.provider.tsx";
import type { FunctionComponent, PropsWithChildren } from "react";
import { TodoListWidgetMapper } from "@/widgets/todoList/mapper.ts";
import type { WidgetDynamicTypeProvider } from "@/widgets/core/context.ts";
import {
  TODO_LIST_WIDGET_TYPE,
  type TodoListWidgetConfig,
} from "@/widgets/todoList/widget.type.ts";
import { IconCheckbox } from "@tabler/icons-react";
import { CORE_WIDGET_WITH_REMOTE_DATA_DYNAMIC_FORM_FIELDS } from "@/widgets/core/forms/dynamicForm.types.ts";

/**
 * Dynamic Provider for TodoList widgets.
 */
const TodoListWidgetDynamicTypeProvider: WidgetDynamicTypeProvider<TodoListWidgetConfig> = {
  mapper: TodoListWidgetMapper,
  metadata: {
    type: TODO_LIST_WIDGET_TYPE,
    label: "Todo List",
    description: "Display a list of tasks with checkboxes",
    icon: () => IconCheckbox,
  },
  createNew: () =>
    ({
      type: TODO_LIST_WIDGET_TYPE,
      id: null!, // ID to be assigned when the widget is added to a dashboard
      title: null!,
      dataUrl: null!,
    }) satisfies TodoListWidgetConfig,
  form: {
    fields: [...(CORE_WIDGET_WITH_REMOTE_DATA_DYNAMIC_FORM_FIELDS as never)],
  },
};

/**
 * Context Provider for TodoList Widget Types.
 *
 * Register this provider to enable TodoList widget functionality.
 */
export const TodoListWidgetTypeContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <WidgetDynamicTypeContextProvider
        dynamicWidgetTypeProvider={TodoListWidgetDynamicTypeProvider}>
        {children}
      </WidgetDynamicTypeContextProvider>
    </>
  );
};
