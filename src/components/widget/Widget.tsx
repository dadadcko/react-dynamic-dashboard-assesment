import { Divider, Group, Paper, Text, Title } from "@mantine/core";
import { type FunctionComponent } from "react";
import type { WidgetConfig } from "@/types/widget.types.ts";
import { WidgetSettingsMenu } from "@/components/widget/WidgetSettingsMenu.tsx";

interface WidgetProps {
  config: WidgetConfig;
  height?: number;
}

export const Widget: FunctionComponent<WidgetProps> = ({ config, height = 250 }) => {
  return (
    <Paper shadow="sm" withBorder h={height} p={8} style={{ overflow: "auto" }}>
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
        <WidgetSettingsMenu />
      </Group>
      <Divider my="xs" />

      {/* Widget Content */}
      {/* TODO: Render actual widget content... */}
      <div> Content will be here ...</div>
    </Paper>
  );
};
