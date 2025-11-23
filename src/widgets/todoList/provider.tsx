import { WidgetDynamicTypeContextProvider } from "@/widgets/core/context.provider.tsx";
import type { FunctionComponent, PropsWithChildren } from "react";
import { TodoListWidgetMapper } from "@/widgets/todoList/mapper.ts";
import type { WidgetDynamicTypeProvider } from "@/widgets/core/context.ts";

/**
 * Dynamic Provider for TodoList widgets.
 */
const TodoListWidgetDynamicTypeProvider: WidgetDynamicTypeProvider = {
  mapper: TodoListWidgetMapper,
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
