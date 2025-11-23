import { WidgetDynamicTypeContextProvider } from "@/widgets/core/context.provider.tsx";
import type { FunctionComponent, PropsWithChildren } from "react";
import { ChartWidgetMapper } from "@/widgets/chart/mapper.ts";
import type { WidgetDynamicTypeProvider } from "@/widgets/core/context.ts";

/**
 * Dynamic Provider for Chart widgets.
 */
const ChartWidgetDynamicTypeProvider: WidgetDynamicTypeProvider = {
  mapper: ChartWidgetMapper,
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
