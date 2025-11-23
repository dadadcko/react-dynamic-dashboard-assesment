import { type FunctionComponent, useCallback, useEffect, useState } from "react";
import type { TodoListItem, TodoListWidget } from "@/widgets/todoList/widget.type.ts";
import { List, ThemeIcon } from "@mantine/core";
import { getByPath } from "@/utils/path.utils.ts";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";

interface TodoListWidgetComponentProps {
  widget: TodoListWidget;
}

const dataKeyNotValidError = (dataKey: string) =>
  new Error(`Could not extract data using dataKey: ${dataKey ? dataKey : "<empty>"}`);

/**
 * UI for TodoList widget type
 */
export const TodoListWidgetComponent: FunctionComponent<TodoListWidgetComponentProps> = ({
  widget,
}) => {
  if (!widget.dataUrl) {
    throw new Error("dataUrl is missing for TodoListWidget");
  }

  // TODO: Move to a custom hook
  const [data, setData] = useState<TodoListItem[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(() => {
    const dataKey = widget.dataKey ?? "";
    const data = fetch(widget.dataUrl)
      .then(res => res.json())
      .then(json => getByPath<TodoListItem[]>(json, dataKey))
      .then(maybeItems => maybeItems ?? Promise.reject(dataKeyNotValidError(dataKey)));

    data.then(items => setData(items)).catch(err => setError(err as Error));
  }, [widget.dataUrl, widget.dataKey]);

  useEffect(loadData, [loadData]);

  // Not loaded yet
  if (!data && !error) {
    return;
  }

  if (error) {
    throw error;
  }

  // try to extract items from data using dataKey
  const dataKey = widget.dataKey ?? "";
  const todoItems = getByPath<TodoListItem[]>(data, dataKey);
  if (!todoItems) {
    throw dataKeyNotValidError(dataKey);
  }

  return (
    <List w="100%">
      {todoItems.map(item => (
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
