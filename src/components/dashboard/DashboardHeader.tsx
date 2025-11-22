import type { FunctionComponent } from "react";
import { Group, Text, Title } from "@mantine/core";
import { DashboardSettingsMenu } from "@/components/dashboard/DashboardSettingsMenu.tsx";
import type { DashboardConfig } from "@/types/dashboard.types";

interface DashboardHeaderProps {
  config: DashboardConfig;
}

export const DashboardHeader: FunctionComponent<DashboardHeaderProps> = ({ config }) => {
  return (
    <Group align="start" justify="space-between">
      <div>
        <Title order={1}>{config.title}</Title>
        <Text size="sm">
          {config.widgets.length} widget{config.widgets.length !== 1 ? "s" : ""}
        </Text>
      </div>

      {/* Settings menu */}
      <Group justify="flex-end" pt="xs" style={{ flexGrow: 1 }}>
        <DashboardSettingsMenu />
      </Group>
    </Group>
  );
};
