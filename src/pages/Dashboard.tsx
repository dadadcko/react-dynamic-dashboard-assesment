import { Divider } from "@mantine/core";
import { useRef } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader.tsx";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel.tsx";
import { useUrlParam } from "@/hooks/useUrlParam.ts";
import { createDashboardStore } from "@/store/dashboard.store.ts";
import { DashboardStoreContext } from "@/contexts/DashboardStoreContext.ts";

const defaultDashboardId = "Daniel's Personal Dashboard";

export function Dashboard() {
  const dashboardId = useUrlParam("dashboard", defaultDashboardId);
  const dashboardStoreRef = useRef<ReturnType<typeof createDashboardStore>>(null);

  // Create store instance for this dashboard (if not already created)
  dashboardStoreRef.current ??= createDashboardStore({ id: dashboardId });

  return (
    <>
      {/* Provide the dashboard store to child components */}
      <DashboardStoreContext.Provider value={dashboardStoreRef.current}>
        <DashboardHeader />
        <Divider my="md" />
        <DashboardPanel />
      </DashboardStoreContext.Provider>
    </>
  );
}
