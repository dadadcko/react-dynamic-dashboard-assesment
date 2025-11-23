import { createElement, type FunctionComponent, type ReactNode, useRef } from "react";
import type { WidgetConfigWithRemoteData } from "@/widgets/core/widget.type.ts";
import { getByPath } from "@/utils/path.utils.ts";
import { Flex, Loader, Text } from "@mantine/core";
import { useDelayedFetch } from "@/common/useDelayedFetch.hook.ts";

const dataKeyNotValidError = (dataKey: string) =>
  new Error(`Could not extract data using dataKey: ${dataKey ? dataKey : "<empty>"}`);

/**
 * Props that the wrapped child component will receive
 */
export interface WidgetWithRemoteDataProps<T extends WidgetConfigWithRemoteData, D> {
  widget: T;
  data: D;
}

/**
 * Props that the optional loader component will receive
 */
export interface WidgetWithRemoteDataLoaderProps<T extends WidgetConfigWithRemoteData> {
  widget: T;
}

export interface WidgetWithRemoteDataComponentProps<T extends WidgetConfigWithRemoteData, D> {
  widget: T;
  child: FunctionComponent<WidgetWithRemoteDataProps<T, D>>;
  loader?: FunctionComponent<WidgetWithRemoteDataLoaderProps<T>>;
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
  loader = DefaultWidgetWithRemoteDataLoaderComponent,
}: WidgetWithRemoteDataComponentProps<T, D>) {
  if (!widget.dataUrl) {
    throw new Error("dataUrl is missing for this widget");
  }

  const loaderComponentRef = useRef<ReactNode>(null);
  const {
    data: rawData,
    error,
    loading,
  } = useDelayedFetch(widget.dataUrl, widget.dataFetchDelay ?? 0);

  // If we have an error, throw it to be caught by a widget error boundary
  if (error) {
    throw error;
  }

  // still loading - display loader, if provided
  if (loading) {
    // avoid creating new loader component on each render
    return loader ? (loaderComponentRef.current ??= createElement(loader, { widget })) : null;
  }

  // clear loader ref once loading is done
  loaderComponentRef.current = null;

  // First render - no error, no loading and no data
  if (!rawData) {
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

// Default loader component when loading remote data, when none is provided
const DefaultWidgetWithRemoteDataLoaderComponent: FunctionComponent = () => {
  return (
    <Flex direction="column" align="center">
      <Loader type="bars" aria-hidden="true" color="dimmed" />
      <Text c="dimmed">Loading data...</Text>
    </Flex>
  );
};
