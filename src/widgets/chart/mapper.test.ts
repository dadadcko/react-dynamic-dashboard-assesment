import { describe, expect, it } from "vitest";
import { ChartWidgetMapper } from "@/widgets/chart/mapper.ts";
import {
  CHART_WIDGET_TYPE,
  type ChartWidget,
  type ChartWidgetConfig,
} from "@/widgets/chart/widget.type.ts";
import type { WidgetConfig } from "@/widgets/core/widget.type.ts";

describe("ChartWidgetMapper", () => {
  const mockChartConfig: ChartWidgetConfig = {
    id: "chart-1",
    type: CHART_WIDGET_TYPE,
    title: "Sales Chart",
    description: "Chart showing sales data",
    dataUrl: "/api/sales",
    xAxisKey: "date",
    series: [{ key: "sales", label: "Sales" }],
  };

  it("should return widget when type matches", () => {
    const result = ChartWidgetMapper(mockChartConfig);

    expect(result).not.toBeNull();
    expect(result?.type).toBe(CHART_WIDGET_TYPE);
  });

  it("should return null when type does not match", () => {
    const nonChartConfig: WidgetConfig = {
      id: "other-1",
      type: "other",
      title: "Other Widget",
    };

    const result = ChartWidgetMapper(nonChartConfig);

    expect(result).toBeNull();
  });

  it("should preserve all config properties", () => {
    const result = ChartWidgetMapper(mockChartConfig) as ChartWidget;

    expect(result?.id).toBe("chart-1");
    expect(result?.title).toBe("Sales Chart");
    expect(result?.description).toBe("Chart showing sales data");
    expect(result?.dataUrl).toBe("/api/sales");
    expect(result?.xAxisKey).toBe("date");
    expect(result?.series).toEqual([{ key: "sales", label: "Sales" }]);
  });

  it("should have render function", () => {
    const result = ChartWidgetMapper(mockChartConfig);

    expect(result?.render).toBeDefined();
    expect(typeof result?.render).toBe("function");
  });

  it("should return widget with correct type property", () => {
    const result = ChartWidgetMapper(mockChartConfig);

    expect(result?.type).toBe(CHART_WIDGET_TYPE);
    expect(result?.type).toBe("chart");
  });

  it("should handle chart config with optional fields", () => {
    const configWithOptionals: ChartWidgetConfig = {
      id: "chart-3",
      type: CHART_WIDGET_TYPE,
      title: "Full Chart",
      description: "A complete chart",
      dataUrl: "/api/data",
      dataKey: "response.data",
      dataFetchDelay: 500,
      xAxisKey: "date",
      xAxisLabel: "Date",
      yAxisLabel: "Value",
      series: [{ key: "value", label: "Value", color: "#ff0000" }],
    };

    const result = ChartWidgetMapper(configWithOptionals) as ChartWidget;

    expect(result).not.toBeNull();
    expect(result?.xAxisLabel).toBe("Date");
    expect(result?.yAxisLabel).toBe("Value");
    expect(result?.dataKey).toBe("response.data");
    expect(result?.dataFetchDelay).toBe(500);
  });

  it("should handle multiple series", () => {
    const configWithMultipleSeries: ChartWidgetConfig = {
      ...mockChartConfig,
      series: [
        { key: "sales", label: "Sales", color: "#00ff00" },
        { key: "revenue", label: "Revenue", color: "#0000ff" },
        { key: "profit", label: "Profit" },
      ],
    };

    const result = ChartWidgetMapper(configWithMultipleSeries) as ChartWidget;

    expect(result?.series).toHaveLength(3);
    expect(result?.series[0].key).toBe("sales");
    expect(result?.series[1].key).toBe("revenue");
    expect(result?.series[2].key).toBe("profit");
  });
});
