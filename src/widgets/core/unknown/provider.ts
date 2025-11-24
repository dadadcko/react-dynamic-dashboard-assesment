import { UnknownWidgetMapper } from "@/widgets/core/unknown/mapper.ts";
import { UNKNOWN_WIDGET_TYPE } from "@/widgets/core/unknown/widget.type.ts";
import type { WidgetDynamicTypeProvider } from "@/widgets/core/context.ts";
import { CORE_WIDGET_DYNAMIC_FORM_FIELDS } from "@/widgets/core/forms/dynamicForm.types.ts";

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
  createNew: () => ({
    id: null!, // ID to be assigned when the widget is added to a dashboard
    type: UNKNOWN_WIDGET_TYPE,
    title: null!,
  }),
  form: {
    fields: CORE_WIDGET_DYNAMIC_FORM_FIELDS,
  },
};
