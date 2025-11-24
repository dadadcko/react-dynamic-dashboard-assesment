import { describe, expect, it } from "vitest";
import { TodoListWidgetMapper } from "@/widgets/todoList/mapper.ts";
import {
  TODO_LIST_WIDGET_TYPE,
  type TodoListWidget,
  type TodoListWidgetConfig,
} from "@/widgets/todoList/widget.type.ts";
import type { WidgetConfig } from "@/widgets/core/widget.type.ts";

describe("TodoListWidgetMapper", () => {
  const mockTodoListConfig: TodoListWidgetConfig = {
    id: "todo-1",
    type: TODO_LIST_WIDGET_TYPE,
    title: "My Tasks",
    description: "List of tasks to complete",
    dataUrl: "/api/todos",
  };

  it("should return widget when type matches", () => {
    const result = TodoListWidgetMapper(mockTodoListConfig);

    expect(result).not.toBeNull();
    expect(result?.type).toBe(TODO_LIST_WIDGET_TYPE);
  });

  it("should return null when type does not match", () => {
    const nonTodoConfig: WidgetConfig = {
      id: "other-1",
      type: "other",
      title: "Other Widget",
    };

    const result = TodoListWidgetMapper(nonTodoConfig);

    expect(result).toBeNull();
  });

  it("should preserve all config properties", () => {
    const result = TodoListWidgetMapper(mockTodoListConfig) as TodoListWidget;

    expect(result?.id).toBe("todo-1");
    expect(result?.title).toBe("My Tasks");
    expect(result?.description).toBe("List of tasks to complete");
    expect(result?.dataUrl).toBe("/api/todos");
  });

  it("should have render function", () => {
    const result = TodoListWidgetMapper(mockTodoListConfig);

    expect(result?.render).toBeDefined();
    expect(typeof result?.render).toBe("function");
  });

  it("should return widget with correct type property", () => {
    const result = TodoListWidgetMapper(mockTodoListConfig);

    expect(result?.type).toBe(TODO_LIST_WIDGET_TYPE);
    expect(result?.type).toBe("todo-list");
  });

  it("should handle todo list config with optional fields", () => {
    const configWithOptionals: TodoListWidgetConfig = {
      id: "todo-3",
      type: TODO_LIST_WIDGET_TYPE,
      title: "Full Todo List",
      description: "A complete todo list",
      dataUrl: "/api/todos",
      dataKey: "response.tasks",
      dataFetchDelay: 200,
    };

    const result = TodoListWidgetMapper(configWithOptionals) as TodoListWidget;

    expect(result).not.toBeNull();
    expect(result?.dataKey).toBe("response.tasks");
    expect(result?.dataFetchDelay).toBe(200);
  });

  it("should handle todo list without description", () => {
    const configWithoutDescription: TodoListWidgetConfig = {
      id: "todo-4",
      type: TODO_LIST_WIDGET_TYPE,
      title: "Simple Todo",
      dataUrl: "/api/todos",
    };

    const result = TodoListWidgetMapper(configWithoutDescription);

    expect(result).not.toBeNull();
    expect(result?.description).toBeUndefined();
  });

  it("should handle different data URL patterns", () => {
    const configs = [
      { ...mockTodoListConfig, dataUrl: "/api/v1/todos" },
      { ...mockTodoListConfig, dataUrl: "https://api.example.com/todos" },
      { ...mockTodoListConfig, dataUrl: "./data/todos.json" },
    ];

    configs.forEach(config => {
      const result = TodoListWidgetMapper(config) as TodoListWidget;
      expect(result).not.toBeNull();
      expect(result?.dataUrl).toBe(config.dataUrl);
    });
  });
});
