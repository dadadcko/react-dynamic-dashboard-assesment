import type { FunctionComponent } from "react";

/**
 * Metadata about a widget type.
 * Used for displaying widget options in the UI.
 */
export interface WidgetTypeMetadata {
  /**
   * The widget type identifier.
   */
  type: string;

  /**
   * If true, the widget will be hidden from the widget selection UI.
   */
  hidden?: boolean;

  /**
   * Human-readable label for the widget type.
   */
  label: string;

  /**
   * Description of the widget type.
   */
  description: string;

  /**
   * Icon component for the widget type.
   *
   * If not specified, a default icon will be used.
   */
  icon?: () => FunctionComponent<{ size?: number }>;
}
