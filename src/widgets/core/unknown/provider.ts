import { UnknownWidgetMapper } from "@/widgets/core/unknown/mapper.ts";
import { UNKNOWN_WIDGET_TYPE } from "@/widgets/core/unknown/widget.type.ts";
import type { WidgetDynamicTypeProvider } from "@/widgets/core/context.ts";

/**
 * Dynamic Provider for widgets of unknown type.
 */
export const UnknownWidgetDynamicTypeProvider: WidgetDynamicTypeProvider = {
  mapper: UnknownWidgetMapper,
  metadata: {
    type: UNKNOWN_WIDGET_TYPE,
    label: "Unknown Widget",
    description: "A fallback widget, used when the specified widget type is not recognized.",
    hidden: true, // Hide from UI selections
  },
};
