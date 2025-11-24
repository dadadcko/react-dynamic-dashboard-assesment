import { WidgetDynamicTypeContextProvider } from "@/widgets/core/context.provider.tsx";
import type { FunctionComponent, PropsWithChildren } from "react";
import { ChartWidgetMapper } from "@/widgets/chart/mapper.ts";
import type { WidgetDynamicTypeProvider } from "@/widgets/core/context.ts";
import {
  CHART_WIDGET_TYPE,
  type ChartDataSeriesDefinition,
  type ChartWidgetConfig,
} from "@/widgets/chart/widget.type.ts";
import { IconChartBar } from "@tabler/icons-react";
import {
  CORE_WIDGET_WITH_REMOTE_DATA_DYNAMIC_FORM_FIELDS,
  type DynamicFormField,
} from "@/widgets/core/forms/dynamicForm.types.ts";

/**
 * Dynamic Provider for Chart widgets.
 */
const ChartWidgetDynamicTypeProvider: WidgetDynamicTypeProvider<ChartWidgetConfig> = {
  mapper: ChartWidgetMapper,
  metadata: {
    type: CHART_WIDGET_TYPE,
    label: "Chart",
    description: "Visualize data with line, bar, or area charts",
    icon: () => IconChartBar,
  },
  createNew: () =>
    ({
      type: CHART_WIDGET_TYPE,
      id: null!, // ID to be assigned when the widget is added to a dashboard
      title: null!,
      dataUrl: null!,
      xAxisKey: null!,
      series: [],
    }) satisfies ChartWidgetConfig,
  form: {
    fields: [
      ...(CORE_WIDGET_WITH_REMOTE_DATA_DYNAMIC_FORM_FIELDS as DynamicFormField<ChartWidgetConfig>[]),
      {
        key: "xAxisKey",
        type: "text",
        label: "X-Axis Key",
        description: "The key for the x-axis data. Supports nested keys using dot notation",
        placeholder: "e.g. date.createdAt",
        defaultValue: "",
        validation: (value: string) => (value.trim() === "" ? "X-Axis Key is required" : null),
      },
      {
        key: "xAxisLabel",
        type: "text",
        label: "X-Axis Label",
        description: "Human-readable label for the x-axis",
        placeholder: "e.g. Date",
        defaultValue: "",
      },
      {
        key: "yAxisLabel",
        type: "text",
        label: "Y-Axis Label",
        description: "Human-readable label for the y-axis",
        placeholder: "e.g. Value",
        defaultValue: "",
      },
      {
        key: "series",
        type: "array",
        label: "Data Series",
        description: "Definitions for the data series to be displayed in the chart",
        defaultValue: [],
        items: [
          {
            key: "key",
            type: "text",
            label: "Series Key",
            description:
              "The key of the data series. Supports nested keys using dot notation (e.g., 'data.items.0.name')",
            placeholder: "e.g. metrics.pageViews",
            defaultValue: "",
            validation: (value: string) => (value?.trim() === "" ? "Series Key is required" : null),
          },
          {
            key: "label",
            type: "text",
            label: "Series Label",
            description:
              "Human-readable label for the series. If empty, the key will be used as the label.",
            placeholder: "e.g. Page Views",
            defaultValue: "",
          },
          {
            key: "color",
            type: "color",
            label: "Series Color",
            description:
              "Color of the series in the chart. If empty, a default color will be assigned.",
            defaultValue: "",
          },
        ],
        validation: (value: ChartDataSeriesDefinition[]) =>
          value.length === 0 ? "At least one data series is required" : null,
      },
    ],
  },
};

/**
 * Context Provider for Chart Widget Types.
 *
 * Register this provider to enable Chart widget functionality.
 */
export const ChartWidgetTypeContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <WidgetDynamicTypeContextProvider dynamicWidgetTypeProvider={ChartWidgetDynamicTypeProvider}>
      {children}
    </WidgetDynamicTypeContextProvider>
  );
};
