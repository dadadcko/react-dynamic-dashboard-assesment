import { WidgetDynamicTypeContextProvider } from "@/widgets/core/context.provider.tsx";
import type { FunctionComponent, PropsWithChildren } from "react";
import { TableWidgetMapper } from "@/widgets/table/mapper.ts";
import type { WidgetDynamicTypeProvider } from "@/widgets/core/context.ts";
import {
  TABLE_WIDGET_TYPE,
  type TableWidgetColumnDefinition,
  type TableWidgetConfig,
} from "@/widgets/table/widget.type.ts";
import { IconTable } from "@tabler/icons-react";
import {
  CORE_WIDGET_WITH_REMOTE_DATA_DYNAMIC_FORM_FIELDS,
  type DynamicFormField,
} from "@/widgets/core/forms/dynamicForm.types.ts";

/**
 * Dynamic Provider for Table widgets.
 */
const TableWidgetDynamicTypeProvider: WidgetDynamicTypeProvider<TableWidgetConfig> = {
  mapper: TableWidgetMapper,
  metadata: {
    type: TABLE_WIDGET_TYPE,
    label: "Table",
    description: "Display data in a tabular format with customizable columns",
    icon: () => IconTable,
  },
  createNew: () =>
    ({
      type: TABLE_WIDGET_TYPE,
      id: null!, // ID to be assigned when the widget is added to a dashboard
      title: null!,
      dataUrl: null!,
      columns: [],
    }) satisfies TableWidgetConfig,
  form: {
    fields: [
      ...(CORE_WIDGET_WITH_REMOTE_DATA_DYNAMIC_FORM_FIELDS as DynamicFormField<TableWidgetConfig>[]),
      {
        key: "stripped",
        type: "boolean",
        label: "Stripped Rows",
        description: "Enable stripped row styling for better readability",
        defaultValue: false,
      },
      {
        key: "columns",
        type: "array",
        label: "Columns",
        description: "Define the columns to display in the table",
        defaultValue: [],
        items: [
          {
            key: "key",
            type: "text",
            label: "Column Key",
            description:
              "The key of the data field for this column. Supports nested keys using dot notation.",
            validation: (value: string) => (!value?.trim() ? "Column key is required" : null),
          },
          {
            key: "label",
            type: "text",
            label: "Column Label",
            description: "The display label for this column",
          },
        ],
        validation: (value: TableWidgetColumnDefinition[]) =>
          value.length === 0 ? "At least one column is required" : null,
      },
    ],
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
