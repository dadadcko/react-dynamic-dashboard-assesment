import { createElement, type FunctionComponent, useContext, useMemo } from "react";
import type { WidgetConfig } from "@/widgets/core/widget.type.ts";
import { WidgetDynamicTypeContext } from "@/widgets/core/context.ts";
import type { WidgetDynamicFormField } from "@/widgets/core/forms/dynamicForm.types.ts";
import { useForm } from "@mantine/form";
import {
  Box,
  Button,
  Group,
  NumberInput,
  Paper,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";

export interface EditWidgetDynamicFormComponentProps {
  widget: WidgetConfig;
  onSubmit: (config: WidgetConfig) => void;
}

export const EditWidgetDynamicFormComponent: FunctionComponent<
  EditWidgetDynamicFormComponentProps
> = ({ widget, onSubmit }) => {
  // Find the provider for the given widget type - throw error if not found
  const providers = useContext(WidgetDynamicTypeContext);
  const provider = providers.find(x => x.metadata.type === widget.type);
  if (!provider) {
    throw new Error(`No provider found for widget type ${widget.type}`);
  }
  // Build initial values from widget and field defaults
  const initialValues = provider.form.fields.reduce(
    (values, field) => {
      values[field.key] = widget[field.key] ?? field.defaultValue ?? null!;
      return values;
    },
    { ...widget }, // Start with existing widget config,
  );

  // Build validation rules from field configurations
  const validate = provider.form.fields.reduce(
    (acc, field) => {
      if (field.validation) {
        acc[field.key] = field.validation as (value: unknown) => string | null;
      }
      return acc;
    },
    {} as Record<keyof WidgetConfig, (value: unknown) => string | null>,
  );

  const form = useForm<WidgetConfig>({
    mode: "uncontrolled",
    initialValues,
    validate,
    validateInputOnBlur: true,
  });

  // Helper function to render form fields based on field type
  const renderField = (field: WidgetDynamicFormField<WidgetConfig>) => {
    const commonProps = {
      key: form.key(field.key),
      label: field.label,
      placeholder: field.placeholder,
      description: field.description,
      withAsterisk: !!field.validation,
    };

    switch (field.type) {
      case "text":
        return <TextInput {...commonProps} {...form.getInputProps(field.key)} />;

      case "number":
        return <NumberInput {...commonProps} {...form.getInputProps(field.key)} />;

      case "boolean":
        return <Switch {...commonProps} {...form.getInputProps(field.key, { type: "checkbox" })} />;

      default:
        return null;
    }
  };

  const Icon = useMemo(() => provider.metadata.icon?.() ?? IconQuestionMark, [provider]);

  return (
    <form onSubmit={form.onSubmit(values => onSubmit(values))}>
      <Paper withBorder p="md" my={8}>
        <Group>
          {createElement(Icon, { size: 36 })}
          <Box flex={1} ta="left">
            <Title order={4}>{provider.metadata.label}</Title>
            <Text size="sm" c="dimmed">
              {provider.metadata.description}
            </Text>
          </Box>
        </Group>
      </Paper>
      <Stack gap="md">{provider.form.fields.map(field => renderField(field))}</Stack>
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};
