import { createElement, type FunctionComponent } from "react";
import type { TodoListItem, TodoListWidget } from "@/widgets/todoList/widget.type.ts";
import { List, ThemeIcon } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
import {
  WidgetWithRemoteDataComponent,
  type WidgetWithRemoteDataProps,
} from "@/widgets/core/widgetWithRemoteData.component.tsx";

interface TodoListWidgetComponentProps {
  widget: TodoListWidget;
}

/**
 * UI for TodoList widget type
 *
 * Uses {@link WidgetWithRemoteDataComponent} HOC to fetch data, then passes it to the actual todoList UI
 */
export const TodoListWidgetComponent: FunctionComponent<TodoListWidgetComponentProps> = props =>
  createElement(WidgetWithRemoteDataComponent<TodoListWidget, TodoListItem[]>, {
    ...props,
    child: TodoListWidgetComponent_,
  });

// Actual component that receives the fetched data as prop from HOC above
const TodoListWidgetComponent_: FunctionComponent<
  WidgetWithRemoteDataProps<TodoListWidget, TodoListItem[]>
> = ({ data }) => {
  return (
    <List w="100%">
      {data.map(item => (
        <List.Item
          py={8}
          key={item.id}
          style={{ textDecoration: item.completed ? "line-through" : "none" }}
          icon={
            <ThemeIcon color={item.completed ? "teal" : "blue"} size={24} radius="xl">
              {item.completed ? <IconCircleCheck size={16} /> : <IconCircleDashed size={16} />}
            </ThemeIcon>
          }>
          {item.task}
        </List.Item>
      ))}
    </List>
  );
};

export default TodoListWidgetComponent;
