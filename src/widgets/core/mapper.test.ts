import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createElement, type PropsWithChildren } from "react";
import { useChainedWidgetMapper, type WidgetMapper } from "@/widgets/core/mapper.ts";
import { WidgetDynamicTypeContextProvider } from "@/widgets/core/context.provider.tsx";
import type { WidgetDynamicTypeProvider } from "@/widgets/core/context.ts";
import type { WidgetConfig } from "@/widgets/core/widget.type.ts";

describe("useChainedWidgetMapper", () => {
  const createMockProvider = (type: string, shouldHandle = true): WidgetDynamicTypeProvider => {
    const mapper: WidgetMapper = config => {
      if (config.type === type && shouldHandle) {
        return {
          ...config,
          render: () => null,
        };
      }
      return null;
    };

    return {
      mapper,
      metadata: {
        type,
        label: `${type} Widget`,
        description: `Test ${type} widget`,
      },
      createNew: () => ({ id: "", type, title: "" }) as WidgetConfig,
      form: { fields: [] },
    };
  };

  it("should return a chained mapper function", () => {
    const { result } = renderHook(() => useChainedWidgetMapper());

    expect(typeof result.current).toBe("function");
  });

  it("should use first matching mapper in chain", () => {
    const provider1 = createMockProvider("type1");
    const provider2 = createMockProvider("type2");

    const wrapper = ({ children }: PropsWithChildren) =>
      createElement(
        WidgetDynamicTypeContextProvider,
        { dynamicWidgetTypeProvider: provider1 },
        createElement(
          WidgetDynamicTypeContextProvider,
          { dynamicWidgetTypeProvider: provider2 },
          children,
        ),
      );

    const { result } = renderHook(() => useChainedWidgetMapper(), { wrapper });
    const config: WidgetConfig = { id: "1", type: "type1", title: "Test" };
    const widget = result.current(config);

    expect(widget).not.toBeNull();
    expect(widget?.type).toBe("type1");
  });

  it("should try next mapper when current returns null", () => {
    const provider1 = createMockProvider("type1");
    const provider2 = createMockProvider("type2");

    const wrapper = ({ children }: PropsWithChildren) =>
      createElement(
        WidgetDynamicTypeContextProvider,
        { dynamicWidgetTypeProvider: provider1 },
        createElement(
          WidgetDynamicTypeContextProvider,
          { dynamicWidgetTypeProvider: provider2 },
          children,
        ),
      );

    const { result } = renderHook(() => useChainedWidgetMapper(), { wrapper });
    const config: WidgetConfig = { id: "2", type: "type2", title: "Test" };
    const widget = result.current(config);

    expect(widget).not.toBeNull();
    expect(widget?.type).toBe("type2");
  });

  it("should fall back to UnknownWidgetMapper when no custom mapper handles config", () => {
    const provider1 = createMockProvider("type1");
    const provider2 = createMockProvider("type2");

    const wrapper = ({ children }: PropsWithChildren) =>
      createElement(
        WidgetDynamicTypeContextProvider,
        { dynamicWidgetTypeProvider: provider1 },
        createElement(
          WidgetDynamicTypeContextProvider,
          { dynamicWidgetTypeProvider: provider2 },
          children,
        ),
      );

    const { result } = renderHook(() => useChainedWidgetMapper(), { wrapper });
    const config: WidgetConfig = { id: "3", type: "unknown-type", title: "Test" };
    const widget = result.current(config);

    // Should return unknown widget instead of throwing
    expect(widget).not.toBeNull();
    expect(widget?.type).toBe("unknown");
  });

  it("should pass through UnknownWidgetMapper as fallback", () => {
    // With default context (only UnknownWidgetDynamicTypeProvider)
    const { result } = renderHook(() => useChainedWidgetMapper());
    const config: WidgetConfig = { id: "4", type: "any-type", title: "Test" };
    const widget = result.current(config);

    // UnknownWidgetMapper always returns a widget
    expect(widget).not.toBeNull();
    expect(widget?.type).toBe("unknown");
  });

  it("should memoize the chained mapper", () => {
    // Safeguard against removing memoization in implementation
    // to ensure performance - not creating new chain on each render

    const provider = createMockProvider("test");

    const wrapper = ({ children }: PropsWithChildren) =>
      createElement(
        WidgetDynamicTypeContextProvider,
        { dynamicWidgetTypeProvider: provider },
        children,
      );

    const { result, rerender } = renderHook(() => useChainedWidgetMapper(), { wrapper });
    const firstMapper = result.current;

    rerender();
    const secondMapper = result.current;

    // Same function reference (memoized)
    expect(firstMapper).toBe(secondMapper);
  });

  it("should handle empty additional providers correctly", () => {
    // Default context only has UnknownWidgetDynamicTypeProvider
    const { result } = renderHook(() => useChainedWidgetMapper());
    const config: WidgetConfig = { id: "5", type: "test", title: "Test" };
    const widget = result.current(config);

    // Should fall back to UnknownWidget
    expect(widget).not.toBeNull();
    expect(widget?.type).toBe("unknown");
  });

  it("should preserve widget config properties in mapped widget", () => {
    const provider = createMockProvider("test");

    const wrapper = ({ children }: PropsWithChildren) =>
      createElement(
        WidgetDynamicTypeContextProvider,
        { dynamicWidgetTypeProvider: provider },
        children,
      );

    const { result } = renderHook(() => useChainedWidgetMapper(), { wrapper });
    const config: WidgetConfig = {
      id: "6",
      type: "test",
      title: "My Widget",
      description: "Widget description",
    };
    const widget = result.current(config);

    expect(widget?.id).toBe("6");
    expect(widget?.title).toBe("My Widget");
    expect(widget?.description).toBe("Widget description");
  });
});
