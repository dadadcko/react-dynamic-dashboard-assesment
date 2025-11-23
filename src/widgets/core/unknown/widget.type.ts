import type { Widget } from "@/widgets/core/widget.type.ts";

export const UNKNOWN_WIDGET_TYPE = "unknown";

/**
 * Represents a widget of unknown type.
 *
 * This is used as a fallback for unrecognized widget types.
 */
export interface UnknownWidget extends Widget {
  type: typeof UNKNOWN_WIDGET_TYPE;
  originalType: string;
}
