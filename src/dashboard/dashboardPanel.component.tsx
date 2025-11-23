import type { FunctionComponent } from "react";
import { Grid, Text } from "@mantine/core";
import { WidgetActionsContext } from "@/widgets/core/context.ts";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { DndWidgetComponent } from "@/widgets/core/dndWidget.component.tsx";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import type { WidgetActions } from "@/widgets/core/widget.type.ts";
import { useDashboardStore } from "@/dashboard/context.ts";

export const DashboardPanelComponent: FunctionComponent = () => {
  // Store State
  const panelColumns = useDashboardStore(s => s.panelColumns);
  const widgetHeight = useDashboardStore(s => s.widgetHeight);
  const widgets = useDashboardStore(s => s.widgets);
  const isLocked = useDashboardStore(s => s.locked);

  // Store Actions
  const saveWidget = useDashboardStore(s => s.saveWidget);
  const deleteWidget = useDashboardStore(s => s.deleteWidget);
  const moveWidget = useDashboardStore(s => s.moveWidget);

  // Set up drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // Handle drag and drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // In this case nothing has changed
    if (!(over && active.id !== over.id)) {
      return;
    }

    const current = widgets.find(w => w.id === active.id);
    if (!current) {
      return;
    }

    const targetIndex = widgets.findIndex(w => w.id === over.id);
    moveWidget(current, targetIndex);
  }

  // Bind widget actions to store functions
  // Disable actions if dashboard is locked
  const widgetActions: WidgetActions = isLocked
    ? {}
    : {
        onDelete: w => deleteWidget(w.id),
        onSave: w => saveWidget(w),
      };

  return widgets.length === 0 ? (
    // Empty dashboard state
    <Text ta="center" c="dimmed" p={16}>
      No widgets in dashboard. Start by adding some!
    </Text>
  ) : (
    <Grid align="flex-start" columns={panelColumns} overflow="hidden">
      {/* Enables Sorting of widgets */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToWindowEdges]}
        onDragEnd={handleDragEnd}>
        <SortableContext items={widgets}>
          {widgets.map(widget => (
            <Grid.Col key={widget.id} span={{ base: panelColumns, md: panelColumns / 2, lg: 1 }}>
              {/* Render DnD widgets with their actions*/}
              <WidgetActionsContext.Provider value={widgetActions}>
                <DndWidgetComponent disabled={isLocked} config={widget} height={widgetHeight} />
              </WidgetActionsContext.Provider>
            </Grid.Col>
          ))}
        </SortableContext>
      </DndContext>
    </Grid>
  );
};
