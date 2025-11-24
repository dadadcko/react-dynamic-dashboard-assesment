import { type FunctionComponent, useEffect } from "react";
import { Box, Button, Divider, Drawer, Group, JsonInput, Title } from "@mantine/core";
import type { DashboardConfig } from "@/dashboard/dashboard.type.ts";
import { useField } from "@mantine/form";

export interface DashboardImportExportDrawerProps {
  /**
   * Optional existing dashboard configuration export.
   * If provided, the drawer will show export options.
   * If not provided, the drawer will show import options.
   */
  dashboardConfig?: DashboardConfig;
  show: boolean;
  onClose: () => void;
  onSave: (dashboardConfig: DashboardConfig) => void;
}

export const DashboardImportExportDrawerComponent: FunctionComponent<
  DashboardImportExportDrawerProps
> = ({ dashboardConfig, show, onClose, onSave }) => {
  const isExportMode = Boolean(dashboardConfig);

  const field = useField({
    initialValue: "",
    validateOnBlur: true,
  });
  const { setValue } = field;

  // Sync local state with prop changes
  useEffect(() => {
    const jsonValue = isExportMode ? JSON.stringify(dashboardConfig, null, 2) : "";
    setValue(jsonValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardConfig, isExportMode]);

  const handleClose = () => {
    field.reset();
    onClose();
  };

  const handleSave = () => {
    try {
      const parsedConfig = JSON.parse(field.getValue()) as DashboardConfig;
      onSave(parsedConfig);
      field.reset();
    } catch (error) {
      field.setError("Error while parsing JSON. Check the format and try again.");
    }
  };

  return (
    <Drawer
      position="right"
      opened={show}
      onClose={handleClose}
      size="lg"
      title={isExportMode ? "Export Dashboard" : "Import Dashboard"}
      closeButtonProps={{ "aria-label": `Close ${isExportMode ? "export" : "import"} drawer` }}
      transitionProps={{ transition: "slide-left", duration: 300 }}>
      <Divider />
      <Box mt={16}>
        <Title order={2}>
          {isExportMode ? `Export ${dashboardConfig?.title}` : "Import Dashboard"}
        </Title>

        <JsonInput
          mt={16}
          readOnly={isExportMode}
          autosize
          minRows={20}
          validationError="Invalid JSON"
          description={
            isExportMode
              ? "Copy the following JSON to export your dashboard configuration."
              : "Paste your dashboard configuration JSON here to import."
          }
          label="Dashboard configuration"
          {...field.getInputProps()}
        />
      </Box>
      {!isExportMode && (
        <Group justify="flex-end" mt="md">
          <Button type="submit" onClick={handleSave}>
            Save Widget
          </Button>
        </Group>
      )}
    </Drawer>
  );
};
