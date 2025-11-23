import { createElement, type FunctionComponent } from "react";
import type { TableData, TableWidget } from "@/widgets/table/widget.type.ts";
import {
  WidgetWithRemoteDataComponent,
  type WidgetWithRemoteDataProps,
} from "@/widgets/core/widgetWithRemoteData.component.tsx";
import { Box, Table } from "@mantine/core";
import { getByPath } from "@/utils/path.utils.ts";

interface TableWidgetComponentProps {
  widget: TableWidget;
}

/**
 * UI for Table widget type
 *
 * Uses {@link WidgetWithRemoteDataComponent} HOC to fetch data, then passes it to the actual todoList UI
 */
export const TableWidgetComponent: FunctionComponent<TableWidgetComponentProps> = props =>
  createElement(WidgetWithRemoteDataComponent<TableWidget, TableData[]>, {
    ...props,
    child: TableWidgetComponent_,
  });

// Actual component that receives the fetched data as prop from HOC above
const TableWidgetComponent_: FunctionComponent<
  WidgetWithRemoteDataProps<TableWidget, TableData[]>
> = ({ widget, data }) => {
  return (
    <Box w="100%">
      <Table
        w="100%"
        verticalSpacing="sm"
        withColumnBorders
        striped={widget.stripped}
        highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            {widget.columns.map((col, idx) => (
              <Table.Th key={idx}>{col.label ?? col.key}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data?.map((row, rowIndex) => (
            <Table.Tr key={rowIndex}>
              {widget.columns.map((col, colIndex) => (
                <Table.Td key={colIndex}>{getByPath(row, col.key)}</Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default TableWidgetComponent;
