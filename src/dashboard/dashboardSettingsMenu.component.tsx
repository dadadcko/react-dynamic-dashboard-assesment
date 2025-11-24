import { type FunctionComponent, lazy, useState } from "react";
import { Button, Menu } from "@mantine/core";
import {
  IconDownload,
  IconLock,
  IconLockOpen2,
  IconMaximize,
  IconMinimize,
  IconPlus,
  IconSettings,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";
import { useDashboardStore } from "@/dashboard/context.ts";
import { useStretchableContainer } from "@/common/stretchableContainer/context.ts";
import type { WidgetConfig } from "@/widgets/core/widget.type.ts";
import { DashboardImportExportDrawerComponent } from "@/dashboard/importExportDrawer.component.tsx";
import type { DashboardConfig } from "@/dashboard/dashboard.type.ts";

const LazyAddFormComponent = lazy(() => import("@/widgets/core/forms/form.component.tsx"));

export const DashboardSettingsMenuComponent: FunctionComponent = () => {
  const isFluid = useStretchableContainer(x => x.isFluid);
  const setFluid = useStretchableContainer(x => x.setFluid);
  const isLocked = useDashboardStore(s => s.locked);
  const toggleLock = useDashboardStore(s => s.toggleLock);
  const saveWidget = useDashboardStore(s => s.saveWidget);
  const clearWidgets = useDashboardStore(s => s.clearWidgets);

  const dashboardState = useDashboardStore(s => s);
  const importDashboard = useDashboardStore(s => s.importDashboard);

  const [isAddingWidget, setIsAddingWidget] = useState(false);
  const [isImport, setIsImport] = useState(false);
  const [isExport, setIsExport] = useState(false);

  const handleAddWidget = (widget: WidgetConfig) => {
    setIsAddingWidget(false);
    saveWidget(widget);
  };

  const handleImport = (dasboardConfig: DashboardConfig) => {
    setIsImport(false);
    importDashboard(dasboardConfig);
  };

  return (
    <>
      <Menu shadow="md">
        <Menu.Target>
          <Button
            variant="default"
            leftSection={<IconSettings />}
            aria-label="Open dashboard settings">
            Settings
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>General</Menu.Label>
          <Menu.Item
            disabled={isLocked}
            leftSection={<IconPlus size={14} />}
            onClick={() => setIsAddingWidget(true)}>
            Add Widget
          </Menu.Item>
          <Menu.Item leftSection={<IconUpload size={14} />} onClick={() => setIsImport(true)}>
            Import
          </Menu.Item>
          <Menu.Item leftSection={<IconDownload size={14} />} onClick={() => setIsExport(true)}>
            Export
          </Menu.Item>
          <Menu.Item
            leftSection={isLocked ? <IconLockOpen2 size={14} /> : <IconLock size={14} />}
            onClick={toggleLock}>
            {isLocked ? "Unlock" : "Lock"}
          </Menu.Item>

          <Menu.Divider />
          <Menu.Label>Display</Menu.Label>
          <Menu.Item
            leftSection={isFluid ? <IconMinimize size={14} /> : <IconMaximize size={14} />}
            onClick={() => setFluid(fluid => !fluid)}>
            {isFluid ? "Shrink size" : "Stretch size"}
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            disabled={isLocked}
            c="red"
            leftSection={<IconTrash size={14} />}
            onClick={clearWidgets}>
            Clear widgets
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      {/* Handle for edit form component*/}
      <LazyAddFormComponent
        show={isAddingWidget}
        onSubmit={handleAddWidget}
        onClose={() => setIsAddingWidget(false)}
      />

      {/* Handle for import/export drawer component */}
      <DashboardImportExportDrawerComponent
        show={isImport || isExport}
        dashboardConfig={isExport ? dashboardState : undefined}
        onSave={handleImport}
        onClose={() => {
          setIsImport(false);
          setIsExport(false);
        }}
      />
    </>
  );
};
