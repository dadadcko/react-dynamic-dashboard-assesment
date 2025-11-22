import type { FunctionComponent } from "react";
import { Group, Text, Title } from "@mantine/core";
import { DashboardSettingsMenu } from "@/components/dashboard/DashboardSettingsMenu.tsx";
import { useDashboardStore } from "@/hooks/useDashboardStore.ts";

export const DashboardHeader: FunctionComponent = () => {
  const title = useDashboardStore(s => s.title);
  const widgets = useDashboardStore(s => s.widgets);

  return (
    <Group align="start" justify="space-between">
      <div>
        <Title order={1}>{title}</Title>
        <Text size="sm">
          {widgets.length} widget{widgets.length !== 1 ? "s" : ""}
        </Text>
      </div>

      {/* Settings menu */}
      <Group justify="flex-end" pt="xs" style={{ flexGrow: 1 }}>
        <DashboardSettingsMenu />
      </Group>
    </Group>
  );
};
