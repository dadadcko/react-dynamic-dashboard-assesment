import { Button, Center, Divider, Group, Paper, Skeleton, Text, Title } from "@mantine/core";
import { type FunctionComponent, Suspense, useState } from "react";
import type { WidgetConfig } from "@/types/widget.types.ts";
import { WidgetSettingsMenu } from "@/components/widget/WidgetSettingsMenu.tsx";
import { useWidgetRenderer } from "@/hooks/useWidgetRenderer.ts";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { IconFileSad } from "@tabler/icons-react";
import { useWidgetMapper } from "@/hooks/useWidgetMapper.ts";

interface WidgetProps {
  config: WidgetConfig;
  height?: number;
  onDelete?: () => void;
}

// Loading skeleton to show while widget is being rendered
const WidgetLoadingSkeleton: FunctionComponent = () => <Skeleton height="100%" />;

// Fallback component to show when widget rendering fails
const WidgetRenderErrorFallback: FunctionComponent<FallbackProps & { retry: number }> = ({
  error,
  resetErrorBoundary,
  retry,
}) => (
  <div style={{ textAlign: "center" }}>
    <IconFileSad size="48" stroke={1.5} />
    <Text c="red">Error while rendering widget {!!retry && `(${retry + 1}x)`}</Text>
    <Text size="xs" c="dimmed" mb="xs">
      Error details: {(error as Error)?.message ?? "Unknown error"}
    </Text>
    <Button variant="default" onClick={resetErrorBoundary}>
      Try again
    </Button>
  </div>
);

// Concrete renderer that uses the WidgetRenderer service to render the widget
// Needs to be separate to apply Suspense and ErrorBoundary correctly
const ConcreteWidgetRenderer: FunctionComponent<Pick<WidgetProps, "config">> = ({ config }) => {
  const mapper = useWidgetMapper();
  const renderer = useWidgetRenderer();

  return renderer.render(mapper(config));
};

export const Widget: FunctionComponent<WidgetProps> = ({ config, height = 250, onDelete }) => {
  const [renderRetryCount, setRenderRetryCount] = useState(0);

  return (
    <Paper
      shadow="sm"
      withBorder
      h={height}
      p={8}
      style={{ overflow: "auto", display: "flex", flexDirection: "column" }}>
      {/* Widget Header*/}
      <Group justify="space-between" align="start">
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
        <WidgetSettingsMenu onDelete={onDelete} />
      </Group>
      <Divider my="xs" />

      {/* Widget Dynamic Content with error boundary and loading state */}
      <Center flex={1}>
        <ErrorBoundary
          fallbackRender={props => (
            <WidgetRenderErrorFallback {...props} retry={renderRetryCount} />
          )}
          onReset={() => setRenderRetryCount(count => count + 1)}>
          <Suspense fallback={<WidgetLoadingSkeleton />}>
            <ConcreteWidgetRenderer config={config} />
          </Suspense>
        </ErrorBoundary>
      </Center>
    </Paper>
  );
};
