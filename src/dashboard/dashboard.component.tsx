import { Divider } from "@mantine/core";
import { useRef } from "react";
import { useUrlParam } from "@/hooks/useUrlParam.ts";
import { TodoListWidgetTypeContextProvider } from "@/widgets/todoList/provider.tsx";
import { TableWidgetTypeContextProvider } from "@/widgets/table/provider.tsx";
import { ChartWidgetTypeContextProvider } from "@/widgets/chart/provider.tsx";
import { createDashboardStore } from "@/dashboard/store.ts";
import { DashboardStoreContext } from "@/dashboard/context.ts";
import { DashboardHeaderComponent } from "@/dashboard/dashboardHeader.component.tsx";
import { DashboardPanelComponent } from "@/dashboard/dashboardPanel.component.tsx";

const defaultDashboardId = "Daniel's Personal Dashboard";

export function DashboardComponent() {
  const dashboardId = useUrlParam("dashboard", defaultDashboardId);
  const dashboardStoreRef = useRef<ReturnType<typeof createDashboardStore>>(null);

  // Create store instance for this dashboard (if not already created)
  dashboardStoreRef.current ??= createDashboardStore({ id: dashboardId });

  return (
    <>
      {/* Provide the dashboard store to child components */}
      <DashboardStoreContext.Provider value={dashboardStoreRef.current}>
        {/* Provide All supported widget types*/}
        <TodoListWidgetTypeContextProvider>
          <TableWidgetTypeContextProvider>
            <ChartWidgetTypeContextProvider>
              <DashboardHeaderComponent />
              <Divider my="md" />
              <DashboardPanelComponent />
            </ChartWidgetTypeContextProvider>
          </TableWidgetTypeContextProvider>
        </TodoListWidgetTypeContextProvider>
      </DashboardStoreContext.Provider>
    </>
  );
}
