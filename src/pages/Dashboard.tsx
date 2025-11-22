import { Divider } from "@mantine/core";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader.tsx";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel.tsx";
import type { DashboardConfig } from "@/types/dashboard.types.ts";

// TODO: Use actual data from store
const dashboardConfig: DashboardConfig = {
  title: "Daniel's Personal Dashboard",
  panelColumns: 4,
  widgetHeight: 250,
  widgets: [
    { title: "Widget 1", type: "list", id: "1" },
    { title: "Widget 2", type: "chart", id: "2", description: "This one has also description..." },
    { title: "Widget 3", type: "table", id: "3" },
  ],
};

export function Dashboard() {
  // TODO: MOVE TO STORE
  const [config] = useState<DashboardConfig>(dashboardConfig);

  return (
    <>
      <DashboardHeader config={config} />
      <Divider my="md" />
      <DashboardPanel config={config} />
    </>
  );
}
