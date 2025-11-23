import type { FunctionComponent } from "react";
import type { FallbackProps } from "react-error-boundary";
import { Box, Button, Text } from "@mantine/core";
import { IconFileSad } from "@tabler/icons-react";

export interface RenderErrorComponentProps extends FallbackProps {
  resourceName: string;
  retry: number;
  maxRetries?: number;
}

const DEFAULT_MAX_RETRIES = 2;

/**
 * Fallback component to show when rendering fails.
 */
export const RenderErrorComponent: FunctionComponent<RenderErrorComponentProps> = ({
  resourceName,
  error,
  resetErrorBoundary,
  retry,
  maxRetries = DEFAULT_MAX_RETRIES,
}) => {
  return (
    <Box ta="center">
      <Box c="red">
        <IconFileSad size="48" stroke={1.5} />
      </Box>
      <Text c="red">
        Error while rendering {resourceName} {!!retry && `(${retry + 1}x)`}
      </Text>
      <Text size="xs" c="dimmed" mb="xs">
        {(error as Error)?.message ?? "Unknown error"}
      </Text>

      <Button disabled={retry >= maxRetries} variant="default" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </Box>
  );
};

export default RenderErrorComponent;
