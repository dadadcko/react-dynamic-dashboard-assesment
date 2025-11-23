import type { Widget } from "@/widgets/core/widget.type.ts";

/**
 * Represents a widget of unknown type.
 *
 * This is used as a fallback for unrecognized widget types.
 */
export interface UnknownWidget extends Widget {
  type: "unknown";
  originalType: string;
}
