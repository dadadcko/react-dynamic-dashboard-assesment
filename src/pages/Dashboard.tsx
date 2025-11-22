import { Divider } from "@mantine/core";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader.tsx";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel.tsx";

// TODO: Use actual data from store
const dashboardConfig = {
  name: "Daniel's Personal Dashboard",
  columns: 4,
  widgets: [{ name: "First" }, { name: "Second" }, { name: "third" }, { name: "forth" }],
};

export type DashboardConfig = typeof dashboardConfig;

export function Dashboard() {
  // TODO: MOVE TO STORE
  const [config] = useState(dashboardConfig);

  return (
    <>
      <DashboardHeader config={config} />
      <Divider my="md" />
      <DashboardPanel config={config} />
    </>
  );
}
