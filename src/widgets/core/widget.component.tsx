import { Center, Divider, Group, Paper, Text, Title } from "@mantine/core";
import { type FunctionComponent, lazy, Suspense, useState } from "react";
import { WidgetSettingsMenuComponent } from "@/widgets/core/settingsMenu.component.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { useChainedWidgetMapper } from "@/widgets/core/mapper.ts";
import { WidgetSkeletonComponent } from "@/widgets/core/widgetSkeleton.component.tsx";
import type { WidgetConfig } from "@/widgets/core/widget.type.ts";

// Lazy load the error component to optimize initial load
const LazyRenderErrorComponent = lazy(
  () => import("@/widgets/core/widgetRenderError.component.tsx"),
);

export interface WidgetComponentProps {
  config: WidgetConfig;
  height?: number;
}

// Concrete renderer that uses the Dynamic widget type providers to render the final widget
// Needs to be separate to apply Suspense and ErrorBoundary correctly
const DynamicWidgetRenderer: FunctionComponent<{
  config: WidgetComponentProps["config"];
}> = props => useChainedWidgetMapper()(props.config)?.render();

export const Widget: FunctionComponent<WidgetComponentProps> = ({ config, height = 250 }) => {
  const [renderRetryCount, setRenderRetryCount] = useState(0);

  return (
    <Paper
      shadow="sm"
      withBorder
      h={height}
      style={{ overflow: "auto", display: "flex", flexDirection: "column" }}>
      {/* Widget Header*/}
      <Paper shadow="xs" pos="sticky" radius="xs" top={0} style={{ zIndex: 1, boxShadow: "none" }}>
        <Group justify="space-between" align="start" p={8} pb={4}>
          <div>
            <Title order={5} style={{ flex: 1 }}>
              {config.title}
            </Title>
            {config.description && (
              <Text size="xs" c="dimmed">
                {config.description}
              </Text>
            )}
          </div>
          <WidgetSettingsMenuComponent widget={config} />
        </Group>
        <Divider mt={4} />
      </Paper>

      {/* Widget Dynamic Content with error boundary and loading state */}
      <Center flex={1} px={8} py={4}>
        <ErrorBoundary
          fallbackRender={props => <LazyRenderErrorComponent {...props} retry={renderRetryCount} />}
          onReset={() => setRenderRetryCount(count => count + 1)}>
          <Suspense fallback={<WidgetSkeletonComponent />}>
            <DynamicWidgetRenderer config={config} />
          </Suspense>
        </ErrorBoundary>
      </Center>
    </Paper>
  );
};
