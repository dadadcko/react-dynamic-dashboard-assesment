import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { TodoListWidgetTypeContextProvider } from "@/widgets/todoList/provider.tsx";
import { WidgetDynamicTypeContext } from "@/widgets/core/context.ts";
import { TODO_LIST_WIDGET_TYPE } from "@/widgets/todoList/widget.type.ts";

describe("TodoListWidgetProvider", () => {
  it("should register todo list widget type in context", () => {
    const TestConsumer = () => {
      const providers = useContext(WidgetDynamicTypeContext);

      const chartProvider = providers.find(
        (p: { metadata: { type: string } }) => p.metadata.type === TODO_LIST_WIDGET_TYPE,
      );

      return (
        <>
          <p>{chartProvider?.metadata.type}</p>
          <p>{chartProvider?.metadata.label}</p>
          <p>{chartProvider?.metadata.description}</p>
        </>
      );
    };
    render(
      <TodoListWidgetTypeContextProvider>
        <TestConsumer />
      </TodoListWidgetTypeContextProvider>,
    );

    expect(screen.getByText(TODO_LIST_WIDGET_TYPE)).toBeInTheDocument();
  });

  it("should have createNew function that returns valid config skeleton", () => {
    const TestConsumer = () => {
      const providers = useContext(WidgetDynamicTypeContext);

      const chartProvider = providers.find(
        (p: { metadata: { type: string } }) => p.metadata.type === TODO_LIST_WIDGET_TYPE,
      );

      return <p>{chartProvider?.createNew()?.type}</p>;
    };

    render(
      <TodoListWidgetTypeContextProvider>
        <TestConsumer />
      </TodoListWidgetTypeContextProvider>,
    );

    expect(screen.getByText(TODO_LIST_WIDGET_TYPE)).toBeInTheDocument();
  });

  it("should have form configuration with required fields", () => {
    const TestConsumer = () => {
      const providers = useContext(WidgetDynamicTypeContext);

      const chartProvider = providers.find(
        (p: { metadata: { type: string } }) => p.metadata.type === TODO_LIST_WIDGET_TYPE,
      );

      return <p>{chartProvider?.form?.fields.length}</p>;
    };

    render(
      <TodoListWidgetTypeContextProvider>
        <TestConsumer />
      </TodoListWidgetTypeContextProvider>,
    );

    expect(screen.queryByText(/0/)).not.toBeInTheDocument();
  });

  it("should wrap children correctly", () => {
    render(
      <TodoListWidgetTypeContextProvider>
        <div data-testid="child">Child Content</div>
      </TodoListWidgetTypeContextProvider>,
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});
