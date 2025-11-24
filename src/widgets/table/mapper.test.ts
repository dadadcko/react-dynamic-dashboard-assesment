import { describe, expect, it } from "vitest";
import { TableWidgetMapper } from "@/widgets/table/mapper.ts";
import {
  TABLE_WIDGET_TYPE,
  type TableWidget,
  type TableWidgetConfig,
} from "@/widgets/table/widget.type.ts";
import type { WidgetConfig } from "@/widgets/core/widget.type.ts";

describe("TableWidgetMapper", () => {
  const mockTableConfig: TableWidgetConfig = {
    id: "table-1",
    type: TABLE_WIDGET_TYPE,
    title: "Users Table",
    description: "Table showing user data",
    dataUrl: "/api/users",
    columns: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
    ],
  };

  it("should return widget when type matches", () => {
    const result = TableWidgetMapper(mockTableConfig);

    expect(result).not.toBeNull();
    expect(result?.type).toBe(TABLE_WIDGET_TYPE);
  });

  it("should return null when type does not match", () => {
    const nonTableConfig: WidgetConfig = {
      id: "other-1",
      type: "other",
      title: "Other Widget",
    };

    const result = TableWidgetMapper(nonTableConfig);

    expect(result).toBeNull();
  });

  it("should preserve all config properties", () => {
    const result = TableWidgetMapper(mockTableConfig) as TableWidget;

    expect(result?.id).toBe("table-1");
    expect(result?.title).toBe("Users Table");
    expect(result?.description).toBe("Table showing user data");
    expect(result?.dataUrl).toBe("/api/users");
    expect(result?.columns).toEqual([
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
    ]);
  });

  it("should have render function", () => {
    const result = TableWidgetMapper(mockTableConfig);

    expect(result?.render).toBeDefined();
    expect(typeof result?.render).toBe("function");
  });

  it("should return widget with correct type property", () => {
    const result = TableWidgetMapper(mockTableConfig);

    expect(result?.type).toBe(TABLE_WIDGET_TYPE);
    expect(result?.type).toBe("table");
  });

  it("should handle table config with optional fields", () => {
    const configWithOptionals: TableWidgetConfig = {
      id: "table-3",
      type: TABLE_WIDGET_TYPE,
      title: "Full Table",
      description: "A complete table",
      dataUrl: "/api/data",
      dataKey: "response.users",
      dataFetchDelay: 300,
      columns: [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
      ],
    };

    const result = TableWidgetMapper(configWithOptionals) as TableWidget;

    expect(result).not.toBeNull();
    expect(result?.dataKey).toBe("response.users");
    expect(result?.dataFetchDelay).toBe(300);
  });

  it("should handle multiple columns", () => {
    const configWithMultipleColumns: TableWidgetConfig = {
      ...mockTableConfig,
      columns: [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
      ],
    };

    const result = TableWidgetMapper(configWithMultipleColumns) as TableWidget;

    expect(result?.columns).toHaveLength(4);
    expect(result?.columns[0].key).toBe("id");
    expect(result?.columns[1].key).toBe("name");
    expect(result?.columns[2].key).toBe("email");
    expect(result?.columns[3].key).toBe("role");
  });

  it("should handle columns without labels", () => {
    const configWithoutLabels: TableWidgetConfig = {
      ...mockTableConfig,
      columns: [{ key: "name" }, { key: "email" }],
    };

    const result = TableWidgetMapper(configWithoutLabels) as TableWidget;

    expect(result?.columns).toHaveLength(2);
    expect(result?.columns[0].label).toBeUndefined();
    expect(result?.columns[1].label).toBeUndefined();
  });
});
