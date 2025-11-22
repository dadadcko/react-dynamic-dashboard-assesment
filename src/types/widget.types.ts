export interface WidgetConfig {
  /**
   * Unique identifier for the widget
   */
  id: string;

  /**
   * Type of the widget (e.g., 'chart', 'table', 'list')
   *
   * Why string? To allow for extensibility with custom widget types
   */
  type: string;

  /**
   * Title of the widget
   */
  title: string;

  /**
   * Optional description of the widget
   */
  description?: string;
}
