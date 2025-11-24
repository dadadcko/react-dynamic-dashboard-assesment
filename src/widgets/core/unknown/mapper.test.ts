import { describe, expect, it } from "vitest";
import { UnknownWidgetMapper } from "@/widgets/core/unknown/mapper.ts";
import { UNKNOWN_WIDGET_TYPE, type UnknownWidget } from "@/widgets/core/unknown/widget.type.ts";
import type { WidgetConfig } from "@/widgets/core/widget.type.ts";

describe("UnknownWidgetMapper", () => {
  it("should always return a widget (never null)", () => {
    const config: WidgetConfig = {
      id: "test-1",
      type: "any-type",
      title: "Test Widget",
    };

    const result = UnknownWidgetMapper(config);

    expect(result).not.toBeNull();
  });

  it("should set type to UNKNOWN_WIDGET_TYPE", () => {
    const config: WidgetConfig = {
      id: "test-2",
      type: "custom-type",
      title: "Custom Widget",
    };

    const result = UnknownWidgetMapper(config);

    expect(result?.type).toBe(UNKNOWN_WIDGET_TYPE);
    expect(result?.type).toBe("unknown");
  });

  it("should capture originalType from config", () => {
    const config: WidgetConfig = {
      id: "test-3",
      type: "chart",
      title: "Chart Widget",
    };

    const result = UnknownWidgetMapper(config) as UnknownWidget;

    expect(result?.originalType).toBe("chart");
  });

  it("should handle config with unrecognized type", () => {
    const config: WidgetConfig = {
      id: "test-4",
      type: "totally-unknown-type",
      title: "Unknown Widget",
    };

    const result = UnknownWidgetMapper(config) as UnknownWidget;

    expect(result).not.toBeNull();
    expect(result?.type).toBe(UNKNOWN_WIDGET_TYPE);
    expect(result?.originalType).toBe("totally-unknown-type");
  });

  it("should handle config without type field", () => {
    const config = {
      id: "test-5",
      title: "No Type Widget",
    } as WidgetConfig;

    const result = UnknownWidgetMapper(config);

    expect(result).not.toBeNull();
    expect(result?.type).toBe(UNKNOWN_WIDGET_TYPE);
  });

  it("should set originalType to 'not-specified' when type is undefined", () => {
    const config = {
      id: "test-6",
      title: "Undefined Type Widget",
    } as WidgetConfig;

    const result = UnknownWidgetMapper(config) as UnknownWidget;

    expect(result?.originalType).toBe("not-specified");
  });

  it("should preserve all original config properties", () => {
    const config: WidgetConfig = {
      id: "test-7",
      type: "legacy-widget",
      title: "Legacy Widget",
      description: "This is a legacy widget type",
    };

    const result = UnknownWidgetMapper(config);

    expect(result?.id).toBe("test-7");
    expect(result?.title).toBe("Legacy Widget");
    expect(result?.description).toBe("This is a legacy widget type");
  });

  it("should have render function", () => {
    const config: WidgetConfig = {
      id: "test-8",
      type: "test",
      title: "Test",
    };

    const result = UnknownWidgetMapper(config);

    expect(result?.render).toBeDefined();
    expect(typeof result?.render).toBe("function");
  });

  it("should work as fallback for any widget config", () => {
    const configs = [
      { id: "1", type: "invalid", title: "Invalid" },
      { id: "2", type: "", title: "Empty Type" },
      { id: "3", type: "missing-mapper", title: "Missing Mapper" },
      { id: "4", type: "123", title: "Numeric Type" },
    ];

    configs.forEach(config => {
      const result = UnknownWidgetMapper(config);
      expect(result).not.toBeNull();
      expect(result?.type).toBe(UNKNOWN_WIDGET_TYPE);
    });
  });

  it("should handle null or undefined config properties gracefully", () => {
    const config = {
      id: "test-9",
      type: null,
      title: "Null Type",
    } as unknown as WidgetConfig;

    const result = UnknownWidgetMapper(config);

    expect(result).not.toBeNull();
    expect(result?.type).toBe(UNKNOWN_WIDGET_TYPE);
  });

  it("should be suitable as last mapper in chain", () => {
    // UnknownWidgetMapper should never return null, making it perfect as fallback
    const randomConfigs = Array.from({ length: 10 }, (_, i) => ({
      id: `random-${i}`,
      type: `random-type-${Math.random()}`,
      title: `Random Widget ${i}`,
    }));

    randomConfigs.forEach(config => {
      const result = UnknownWidgetMapper(config);
      expect(result).not.toBeNull();
      expect(result?.type).toBe(UNKNOWN_WIDGET_TYPE);
    });
  });
});
