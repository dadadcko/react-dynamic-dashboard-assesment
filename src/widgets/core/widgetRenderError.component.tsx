import type { FunctionComponent } from "react";
import type { FallbackProps } from "react-error-boundary";
import { IconFileSad } from "@tabler/icons-react";
import { Box, Button, Text } from "@mantine/core";

export interface WidgetRenderErrorComponentProps extends FallbackProps {
  retry: number;
  maxRetries?: number;
}

const DEFAULT_MAX_RETRIES = 2;

/**
 * Fallback component to show when widget rendering fails.
 */
export const WidgetRenderErrorComponent: FunctionComponent<WidgetRenderErrorComponentProps> = ({
  error,
  resetErrorBoundary,
  retry,
  maxRetries = DEFAULT_MAX_RETRIES,
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Box c="red">
        <IconFileSad size="48" stroke={1.5} />
      </Box>
      <Text c="red">Error while rendering widget {!!retry && `(${retry + 1}x)`}</Text>
      <Text size="xs" c="dimmed" mb="xs">
        {(error as Error)?.message ?? "Unknown error"}
      </Text>

      <Button disabled={retry >= maxRetries} variant="default" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
};

export default WidgetRenderErrorComponent;
