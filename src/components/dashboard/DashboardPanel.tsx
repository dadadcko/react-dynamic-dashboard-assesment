import type { FunctionComponent } from "react";
import type { DashboardConfig } from "@/pages/Dashboard.tsx";
import { Grid, Paper } from "@mantine/core";

interface DashboardPanelProps {
  config: DashboardConfig;
}

export const DashboardPanel: FunctionComponent<DashboardPanelProps> = ({ config }) => {
  return (
    <Grid align="flex-start" columns={config.columns} overflow="hidden" grow>
      {config.widgets.map((widgetConfig, index) => (
        <Grid.Col key={index} span={{ base: config.columns, md: config.columns / 2, lg: 1 }}>
          {/* Render widget based on its type and configuration */}
          {/* TODO: RENDER ACTUAL WIDGETS HERE...*/}
          <Paper p={0} withBorder h={50}>{`Widget: ${widgetConfig.name}`}</Paper>
        </Grid.Col>
      ))}
    </Grid>
  );
};
