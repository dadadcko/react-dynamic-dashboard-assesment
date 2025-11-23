import { type FunctionComponent, useContext } from "react";
import type { WidgetConfig } from "@/widgets/core/widget.type.ts";
import { WidgetDynamicTypeContext } from "@/widgets/core/context.ts";
import { Box, Button, Grid, Text, Title } from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";

export interface SelectWidgetTypeComponentProps {
  /**
   * Callback when a widget type is selected.
   * Provides fresh new instance of the selected widget configuration.
   * @param config New instance of the selected widget configuration.
   */
  onSelect: (config: WidgetConfig) => void;
}

export const SelectWidgetTypeComponent: FunctionComponent<SelectWidgetTypeComponentProps> = ({
  onSelect,
}) => {
  const widgetProviders = useContext(WidgetDynamicTypeContext);

  // Filter providers that should be hidden from the selection list
  const availableProviders = widgetProviders.filter(p => !p.metadata.hidden);

  return (
    <>
      <Title order={2} mb={16}>
        Select Widget type
      </Title>
      <Grid>
        {availableProviders.map(({ metadata, createNew }) => {
          const Icon = metadata.icon?.() ?? IconQuestionMark;

          return (
            <Grid.Col key={metadata.type} span={12}>
              <Button
                variant="default"
                fullWidth
                p="md"
                h="auto"
                onClick={() => onSelect(createNew())}
                aria-label={`Select ${metadata.label} widget`}
                styles={{
                  inner: {
                    justifyContent: "flex-start",
                    overflow: "visible",
                  },
                  label: {
                    display: "flex",
                    gap: "1rem",
                    whiteSpace: "normal",
                  },
                }}>
                <Icon size={36} />
                <Box flex={1} ta="left">
                  <Title order={4}>{metadata.label}</Title>
                  <Text size="sm" c="dimmed">
                    {metadata.description}
                  </Text>
                </Box>
              </Button>
            </Grid.Col>
          );
        })}
      </Grid>

      {availableProviders.length === 0 && (
        <Text ta="center" c="dimmed" mt="xl">
          No widget types available.
        </Text>
      )}
    </>
  );
};
