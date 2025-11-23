import { WidgetDynamicTypeContextProvider } from "@/widgets/core/context.provider.tsx";
import type { FunctionComponent, PropsWithChildren } from "react";
import { TableWidgetMapper } from "@/widgets/table/mapper.ts";
import type { WidgetDynamicTypeProvider } from "@/widgets/core/context.ts";

/**
 * Dynamic Provider for Table widgets.
 */
const TableWidgetDynamicTypeProvider: WidgetDynamicTypeProvider = {
  mapper: TableWidgetMapper,
};

/**
 * Context Provider for Table Widget Types.
 *
 * Register this provider to enable Table widget functionality.
 */
export const TableWidgetTypeContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <WidgetDynamicTypeContextProvider dynamicWidgetTypeProvider={TableWidgetDynamicTypeProvider}>
      {children}
    </WidgetDynamicTypeContextProvider>
  );
};
