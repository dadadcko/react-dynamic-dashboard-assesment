import { WidgetDynamicTypeContextProvider } from "@/widgets/core/context.provider.tsx";
import type { FunctionComponent, PropsWithChildren } from "react";
import { TodoListWidgetMapper } from "@/widgets/todoList/mapper.ts";
import type { WidgetDynamicTypeProvider } from "@/widgets/core/context.ts";
import { TODO_LIST_WIDGET_TYPE } from "@/widgets/todoList/widget.type.ts";
import { IconCheckbox } from "@tabler/icons-react";

/**
 * Dynamic Provider for TodoList widgets.
 */
const TodoListWidgetDynamicTypeProvider: WidgetDynamicTypeProvider = {
  mapper: TodoListWidgetMapper,
  metadata: {
    type: TODO_LIST_WIDGET_TYPE,
    label: "Todo List",
    description: "Display a list of tasks with checkboxes",
    icon: () => IconCheckbox,
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
