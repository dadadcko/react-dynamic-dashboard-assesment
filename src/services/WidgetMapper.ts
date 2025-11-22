import type { Widget, WidgetConfig } from "@/types/widget.types.ts";

/**
 * Mapper type for widgets.
 * Maps widget configurations to widget instances.
 */
export type WidgetMapper = (config: WidgetConfig) => Widget;

export const DEFAULT_WIDGET_MAPPER_CHAIN: WidgetMapper = (config: WidgetConfig): Widget => {
  // TODO: Change this to be registered dynamically!
  const mappers = [
    _ => null as unknown as Widget, // Dummy mapper, replace with real mappers
    _ => null as unknown as Widget, // Dummy mapper, replace with real mappers
    _ => null as unknown as Widget, // Dummy mapper, replace with real mappers
  ] as WidgetMapper[];

  const mapped = mappers.reduce(
    (widget, mapper) => {
      if (widget) {
        // If already mapped, skip further mappers
        return widget;
      }

      return mapper(config);
    },
    null as Widget | null,
  );

  return (
    mapped ??
    ({
      ...config,
      originalType: config.type,
      type: "unknown",
      accept(renderer) {
        return renderer.renderUnknown(this as Widget & { type: "unknown"; originalType: string });
      },
    } as Widget)
  );
};
