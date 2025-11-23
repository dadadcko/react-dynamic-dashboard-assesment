import type { FunctionComponent } from "react";
import { Button, Menu, Tooltip } from "@mantine/core";
import {
  IconDownload,
  IconLock,
  IconLockOpen2,
  IconMaximize,
  IconMinimize,
  IconPlus,
  IconSettings,
  IconTrash,
  IconTrashX,
  IconUpload,
} from "@tabler/icons-react";
import { useDashboardStore } from "@/dashboard/context.ts";
import { useStretchableContainer } from "@/common/stretchableContainer/context.ts";

export const DashboardSettingsMenuComponent: FunctionComponent = () => {
  const isFluid = useStretchableContainer(x => x.isFluid);
  const setFluid = useStretchableContainer(x => x.setFluid);
  const clearWidgets = useDashboardStore(s => s.clearWidgets);
  const isLocked = useDashboardStore(s => s.locked);
  const toggleLock = useDashboardStore(s => s.toggleLock);

  return (
    <Menu shadow="md">
      <Menu.Target>
        <Button
          variant="default"
          leftSection={<IconSettings />}
          aria-label="Open dashboard settings">
          Settings
        </Button>
      </Menu.Target>

      {/* TODO: ADD ACTIONS ON THESE...*/}
      <Menu.Dropdown>
        <Menu.Label>General</Menu.Label>
        <Menu.Item leftSection={<IconPlus size={14} />}>Add Widget</Menu.Item>
        <Menu.Item leftSection={<IconUpload size={14} />}>Import</Menu.Item>
        <Menu.Item leftSection={<IconDownload size={14} />}>Export</Menu.Item>
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
        <Menu.Item c="red" leftSection={<IconTrash size={14} />} onClick={clearWidgets}>
          Clear widgets
        </Menu.Item>
        <Tooltip label="Currently not implemented" withArrow>
          <Menu.Item c="red" disabled leftSection={<IconTrashX size={14} />}>
            Delete dashboard
          </Menu.Item>
        </Tooltip>
      </Menu.Dropdown>
    </Menu>
  );
};
