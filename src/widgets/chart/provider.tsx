import { WidgetDynamicTypeContextProvider } from "@/widgets/core/context.provider.tsx";
import type { FunctionComponent, PropsWithChildren } from "react";
import { ChartWidgetMapper } from "@/widgets/chart/mapper.ts";
import type { WidgetDynamicTypeProvider } from "@/widgets/core/context.ts";
import { CHART_WIDGET_TYPE } from "@/widgets/chart/widget.type.ts";
import { IconChartBar } from "@tabler/icons-react";

/**
 * Dynamic Provider for Chart widgets.
 */
const ChartWidgetDynamicTypeProvider: WidgetDynamicTypeProvider = {
  mapper: ChartWidgetMapper,
  metadata: {
    type: CHART_WIDGET_TYPE,
    label: "Chart",
    description: "Visualize data with line, bar, or area charts",
    icon: () => IconChartBar,
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
