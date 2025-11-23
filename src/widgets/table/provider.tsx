import { WidgetDynamicTypeContextProvider } from "@/widgets/core/context.provider.tsx";
import type { FunctionComponent, PropsWithChildren } from "react";
import { TableWidgetMapper } from "@/widgets/table/mapper.ts";
import type { WidgetDynamicTypeProvider } from "@/widgets/core/context.ts";
import { TABLE_WIDGET_TYPE } from "@/widgets/table/widget.type.ts";
import { IconTable } from "@tabler/icons-react";

/**
 * Dynamic Provider for Table widgets.
 */
const TableWidgetDynamicTypeProvider: WidgetDynamicTypeProvider = {
  mapper: TableWidgetMapper,
  metadata: {
    type: TABLE_WIDGET_TYPE,
    label: "Table",
    description: "Display data in a tabular format with customizable columns",
    icon: () => IconTable,
  },
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
