import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { ChartWidgetTypeContextProvider } from "@/widgets/chart/provider.tsx";
import { WidgetDynamicTypeContext } from "@/widgets/core/context.ts";
import { CHART_WIDGET_TYPE } from "@/widgets/chart/widget.type.ts";

describe("ChartWidgetProvider", () => {
  it("should register chart widget type in context", () => {
    const TestConsumer = () => {
      const providers = useContext(WidgetDynamicTypeContext);

      const chartProvider = providers.find(
        (p: { metadata: { type: string } }) => p.metadata.type === CHART_WIDGET_TYPE,
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
      <ChartWidgetTypeContextProvider>
        <TestConsumer />
      </ChartWidgetTypeContextProvider>,
    );

    expect(screen.getByText(CHART_WIDGET_TYPE)).toBeInTheDocument();
  });

  it("should have createNew function that returns valid config skeleton", () => {
    const TestConsumer = () => {
      const providers = useContext(WidgetDynamicTypeContext);

      const chartProvider = providers.find(
        (p: { metadata: { type: string } }) => p.metadata.type === CHART_WIDGET_TYPE,
      );

      return <p>{chartProvider?.createNew()?.type}</p>;
    };

    render(
      <ChartWidgetTypeContextProvider>
        <TestConsumer />
      </ChartWidgetTypeContextProvider>,
    );

    expect(screen.getByText(CHART_WIDGET_TYPE)).toBeInTheDocument();
  });

  it("should have form configuration with required fields", () => {
    const TestConsumer = () => {
      const providers = useContext(WidgetDynamicTypeContext);

      const chartProvider = providers.find(
        (p: { metadata: { type: string } }) => p.metadata.type === CHART_WIDGET_TYPE,
      );

      return <p>{chartProvider?.form?.fields.length}</p>;
    };

    render(
      <ChartWidgetTypeContextProvider>
        <TestConsumer />
      </ChartWidgetTypeContextProvider>,
    );

    expect(screen.queryByText(/0/)).not.toBeInTheDocument();
  });

  it("should wrap children correctly", () => {
    render(
      <ChartWidgetTypeContextProvider>
        <div data-testid="child">Child Content</div>
      </ChartWidgetTypeContextProvider>,
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});
