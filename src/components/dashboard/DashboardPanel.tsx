import type { FunctionComponent } from "react";
import type { DashboardConfig } from "@/types/dashboard.types";
import { Grid } from "@mantine/core";
import { Widget } from "@/components/widget/Widget.tsx";

interface DashboardPanelProps {
  config: DashboardConfig;
}

export const DashboardPanel: FunctionComponent<DashboardPanelProps> = ({ config }) => {
  return (
    <Grid align="flex-start" columns={config.panelColumns} overflow="hidden" grow>
      {config.widgets.map((widgetConfig, index) => (
        <Grid.Col
          key={index}
          span={{ base: config.panelColumns, md: config.panelColumns / 2, lg: 1 }}>
          {/* Render individual widgets */}
          <Widget config={widgetConfig} height={config.widgetHeight} />
        </Grid.Col>
      ))}
    </Grid>
  );
};
