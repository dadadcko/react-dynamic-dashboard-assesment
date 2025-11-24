import { Divider } from "@mantine/core";
import { useState } from "react";
import { useUrlParam } from "@/common/useUrlParam.hook.ts";
import { TodoListWidgetTypeContextProvider } from "@/widgets/todoList/provider.tsx";
import { TableWidgetTypeContextProvider } from "@/widgets/table/provider.tsx";
import { ChartWidgetTypeContextProvider } from "@/widgets/chart/provider.tsx";
import { createDashboardStore, type DashboardStore } from "@/dashboard/store.ts";
import { DashboardStoreContext } from "@/dashboard/context.ts";
import { DashboardHeaderComponent } from "@/dashboard/dashboardHeader.component.tsx";
import { DashboardPanelComponent } from "@/dashboard/dashboardPanel.component.tsx";
import type { StoreApi } from "zustand";

const defaultDashboardId = "Daniel's Personal Dashboard";

export function DashboardComponent() {
  const dashboardId = useUrlParam("dashboard", defaultDashboardId);

  // Store instance is held in state to prevent re-creation on re-renders
  const [dashboardStore] = useState<StoreApi<DashboardStore>>(() =>
    createDashboardStore({ id: dashboardId }),
  );

  return (
    <>
      {/* Provide the dashboard store to child components */}
      <DashboardStoreContext.Provider value={dashboardStore}>
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
