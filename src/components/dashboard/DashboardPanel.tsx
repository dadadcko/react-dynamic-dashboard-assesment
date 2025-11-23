import type { FunctionComponent } from "react";
import { Grid } from "@mantine/core";
import { useDashboardStore } from "@/hooks/useDashboardStore.ts";
import { Widget } from "@/widgets/core/widget.component.tsx";

export const DashboardPanel: FunctionComponent = () => {
  const panelColumns = useDashboardStore(s => s.panelColumns);
  const widgetHeight = useDashboardStore(s => s.widgetHeight);
  const widgets = useDashboardStore(s => s.widgets);
  const deleteWidget = useDashboardStore(s => s.deleteWidget);

  return (
    <Grid align="flex-start" columns={panelColumns} overflow="hidden" grow>
      {widgets.map(widgetConfig => (
        <Grid.Col key={widgetConfig.id} span={{ base: panelColumns, md: panelColumns / 2, lg: 1 }}>
          {/* Render individual widgets */}
          <Widget
            config={widgetConfig}
            height={widgetHeight}
            onDelete={() => deleteWidget(widgetConfig.id)}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
};
