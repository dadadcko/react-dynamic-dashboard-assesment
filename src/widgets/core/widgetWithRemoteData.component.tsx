import { createElement, type FunctionComponent } from "react";
import type { WidgetConfigWithRemoteData } from "@/widgets/core/widget.type.ts";
import { useFetch } from "@mantine/hooks";
import { getByPath } from "@/utils/path.utils.ts";

const dataKeyNotValidError = (dataKey: string) =>
  new Error(`Could not extract data using dataKey: ${dataKey ? dataKey : "<empty>"}`);

/**
 * Props that the wrapped child component will receive
 */
export interface WidgetWithRemoteDataProps<T extends WidgetConfigWithRemoteData, D> {
  widget: T;
  data: D;
}

export interface WidgetWithRemoteDataComponentProps<T extends WidgetConfigWithRemoteData, D> {
  widget: T;
  child: FunctionComponent<WidgetWithRemoteDataProps<T, D>>;
}

/**
 * Higher order  component for widgets that fetch remote data, see {@link WidgetConfigWithRemoteData}
 *
 * Passes down the `widget` and  prop to the wrapped child component.
 * Component must be wrapped directly by this component to receive the props.
 *
 * Also passes down the fetched `data` prop once available.
 */
export function WidgetWithRemoteDataComponent<T extends WidgetConfigWithRemoteData, D>({
  widget,
  child,
}: WidgetWithRemoteDataComponentProps<T, D>) {
  if (!widget.dataUrl) {
    throw new Error("dataUrl is missing for this widget");
  }

  const { data: rawData, error, loading } = useFetch(widget.dataUrl);

  // If we have an error, throw it to be caught by a widget error boundary
  if (error) {
    throw error;
  }

  // Either first render or still loading
  if (loading || !rawData) {
    return null;
  }

  // try to extract items from data using dataKey
  const dataKey = widget.dataKey ?? "";
  const data = getByPath<D>(rawData, dataKey);
  if (!data) {
    throw dataKeyNotValidError(dataKey);
  }

  return createElement(child, { widget, data });
}
