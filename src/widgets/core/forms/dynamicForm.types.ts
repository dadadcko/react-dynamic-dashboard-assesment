import type { WidgetConfig, WidgetConfigWithRemoteData } from "@/widgets/core/widget.type.ts";

/**
 * Union type for supported dynamic form field types
 */
export type DynamicFormFieldType = "text" | "number" | "boolean" | "color" | "array";

/**
 * Defines a single field within a dynamic form for widget type
 */
export type DynamicFormField<T, K extends keyof T = keyof T> =
  | DynamicFormFieldPrimitive<T, K>
  | DynamicFormFieldArray<T, K>;

/**
 * Defines a primitive field within a dynamic form.
 */
export interface DynamicFormFieldPrimitive<T, K extends keyof T> {
  /**
   * The key of the field in the widget configuration
   */
  key: K;

  /**
   * Type of the form field
   */
  type: DynamicFormFieldType;

  /**
   * User-friendly label for the field
   */
  label: string;

  /**
   * Placeholder text for the field
   */
  placeholder?: string;

  /**
   * Description or help text for the field
   */
  description?: string;

  /**
   * Default value for the field
   */
  defaultValue?: T[K] extends (infer U)[] ? U : T[K];

  /**
   * Validation function that takes the field value and returns an error message or null if valid
   *
   * @param value - The value of the field to validate
   * @returns An error message string if invalid, or null if valid
   */
  validation?: (value: never) => string | null;
}

/**
 * Defines an array field within a dynamic form.
 */
export type DynamicFormFieldArray<T, K extends keyof T> = DynamicFormFieldPrimitive<T, K> & {
  type: "array";

  /**
   * Definition of nested dynamic form fields within the array
   */
  items: DynamicFormField<T[K] extends (infer U)[] ? U : never>[];
};

/**
 *  Defines a single field within a dynamic form for widget type
 */
export type WidgetDynamicFormField<T extends WidgetConfig = WidgetConfig> = DynamicFormField<T>;

/**
 * Defines the structure for a dynamic form for widget type
 */
export interface WidgetDynamicFormConfiguration<T extends WidgetConfig = WidgetConfig> {
  fields: WidgetDynamicFormField<T>[];
}

/**
 * Core dynamic form fields common to all widget types
 */
export const CORE_WIDGET_DYNAMIC_FORM_FIELDS: WidgetDynamicFormField[] = [
  {
    key: "title",
    type: "text",
    label: "Widget Title",
    placeholder: "e.g. Sales Overview",
    defaultValue: "",
    validation: (value: string) => (!value?.trim() ? "Title is required" : null),
  } satisfies DynamicFormField<WidgetConfig, "title">,
  {
    key: "description",
    type: "text",
    label: "Widget Description",
    placeholder: "e.g. Displays sales data over time",
    defaultValue: "",
  } satisfies DynamicFormField<WidgetConfig, "description">,
];

export const CORE_WIDGET_WITH_REMOTE_DATA_DYNAMIC_FORM_FIELDS: WidgetDynamicFormField<WidgetConfigWithRemoteData>[] =
  [
    ...(CORE_WIDGET_DYNAMIC_FORM_FIELDS as WidgetDynamicFormField<WidgetConfigWithRemoteData>[]),
    {
      key: "dataUrl",
      type: "text",
      label: "Data URL",
      description: "URL to fetch data for the widget",
      placeholder: "e.g. /api/data/sales",
      defaultValue: "",
      validation: (value: string) => (!value?.trim() ? "Data URL is required" : null),
    } satisfies DynamicFormField<WidgetConfigWithRemoteData, "dataUrl">,
    {
      key: "dataKey",
      type: "text",
      label: "Data Key",
      description:
        "Key to select specific data from the fetched response, " +
        "supports nested keys using dot notation." +
        " If empty, the response root will be used.",
      placeholder: "e.g. data.items",
      defaultValue: "",
    } satisfies DynamicFormField<WidgetConfigWithRemoteData, "dataKey">,
    {
      key: "dataFetchDelay",
      type: "number",
      label: "Data Fetch Delay (ms)",
      description:
        "Optional delay in milliseconds to simulate data fetching latency. " +
        "For demo purposes only.",
      placeholder: "e.g. 1000",
      defaultValue: 0,
    } satisfies DynamicFormField<WidgetConfigWithRemoteData, "dataFetchDelay">,
  ];
