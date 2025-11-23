import { createElement, type FunctionComponent } from "react";
import type { ChartData, ChartWidget } from "@/widgets/chart/widget.type.ts";
import {
  WidgetWithRemoteDataComponent,
  type WidgetWithRemoteDataProps,
} from "@/widgets/core/widgetWithRemoteData.component.tsx";

// Import Mantine Charts styles
import "@mantine/charts/styles.css";
import { LineChart, type LineChartSeries } from "@mantine/charts";

interface ChartWidgetComponentProps {
  widget: ChartWidget;
}

/**
 * UI for Chart widget type
 *
 * Uses {@link WidgetWithRemoteDataComponent} HOC to fetch data, then passes it to the actual chart UI
 */
export const ChartWidgetComponent: FunctionComponent<ChartWidgetComponentProps> = props =>
  createElement(WidgetWithRemoteDataComponent<ChartWidget, ChartData[]>, {
    ...props,
    child: ChartWidgetComponent_,
  });

// Actual component that receives the fetched data as prop from HOC above
const ChartWidgetComponent_: FunctionComponent<
  WidgetWithRemoteDataProps<ChartWidget, ChartData[]>
> = ({ widget, data }) => {
  const series: LineChartSeries[] = widget.series.map(s => ({
    name: s.key,
    label: s.label ?? s.key,
    color: s.color,
  }));

  return (
    <LineChart
      p={8}
      pt={16}
      h="100%"
      w="100%"
      tooltipAnimationDuration={200}
      data={data}
      dataKey={widget.xAxisKey}
      yAxisLabel={widget.yAxisLabel}
      xAxisLabel={widget.xAxisLabel ?? widget.xAxisKey}
      series={series}
    />
  );
};

export default ChartWidgetComponent;
