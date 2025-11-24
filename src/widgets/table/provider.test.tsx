import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { TableWidgetTypeContextProvider } from "@/widgets/table/provider.tsx";
import { WidgetDynamicTypeContext } from "@/widgets/core/context.ts";
import { TABLE_WIDGET_TYPE } from "@/widgets/table/widget.type.ts";

describe("TableWidgetProvider", () => {
  it("should register table widget type in context", () => {
    const TestConsumer = () => {
      const providers = useContext(WidgetDynamicTypeContext);

      const chartProvider = providers.find(
        (p: { metadata: { type: string } }) => p.metadata.type === TABLE_WIDGET_TYPE,
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
      <TableWidgetTypeContextProvider>
        <TestConsumer />
      </TableWidgetTypeContextProvider>,
    );

    expect(screen.getByText(TABLE_WIDGET_TYPE)).toBeInTheDocument();
  });

  it("should have createNew function that returns valid config skeleton", () => {
    const TestConsumer = () => {
      const providers = useContext(WidgetDynamicTypeContext);

      const chartProvider = providers.find(
        (p: { metadata: { type: string } }) => p.metadata.type === TABLE_WIDGET_TYPE,
      );

      return <p>{chartProvider?.createNew()?.type}</p>;
    };

    render(
      <TableWidgetTypeContextProvider>
        <TestConsumer />
      </TableWidgetTypeContextProvider>,
    );

    expect(screen.getByText(TABLE_WIDGET_TYPE)).toBeInTheDocument();
  });

  it("should have form configuration with required fields", () => {
    const TestConsumer = () => {
      const providers = useContext(WidgetDynamicTypeContext);

      const chartProvider = providers.find(
        (p: { metadata: { type: string } }) => p.metadata.type === TABLE_WIDGET_TYPE,
      );

      return <p>{chartProvider?.form?.fields.length}</p>;
    };

    render(
      <TableWidgetTypeContextProvider>
        <TestConsumer />
      </TableWidgetTypeContextProvider>,
    );

    expect(screen.queryByText(/0/)).not.toBeInTheDocument();
  });

  it("should wrap children correctly", () => {
    render(
      <TableWidgetTypeContextProvider>
        <div data-testid="child">Child Content</div>
      </TableWidgetTypeContextProvider>,
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});
