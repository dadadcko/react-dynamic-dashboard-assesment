import type { FunctionComponent } from "react";
import { Grid } from "@mantine/core";
import { useDashboardStore } from "@/hooks/useDashboardStore.ts";
import { Widget } from "@/widgets/core/widget.component.tsx";
import { WidgetActionsContext } from "@/widgets/core/context.ts";

export const DashboardPanel: FunctionComponent = () => {
  const panelColumns = useDashboardStore(s => s.panelColumns);
  const widgetHeight = useDashboardStore(s => s.widgetHeight);
  const widgets = useDashboardStore(s => s.widgets);
  const deleteWidget = useDashboardStore(s => s.deleteWidget);

  return (
    <Grid align="flex-start" columns={panelColumns} overflow="hidden" grow>
      {widgets.map(widgetConfig => (
        <Grid.Col key={widgetConfig.id} span={{ base: panelColumns, md: panelColumns / 2, lg: 1 }}>
          {/* Render individual widgets, with actions bound to store */}
          <WidgetActionsContext.Provider
            value={{
              onDelete: w => deleteWidget(w.id),
              // TODO: implement edit functionality
              onEdit: () => {
                throw new Error("Edit functionality not implemented yet");
              },
            }}>
            <Widget config={widgetConfig} height={widgetHeight} />
          </WidgetActionsContext.Provider>
        </Grid.Col>
      ))}
    </Grid>
  );
};
