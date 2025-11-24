import { createElement, type FunctionComponent, useContext, useMemo } from "react";
import type { WidgetConfig } from "@/widgets/core/widget.type.ts";
import { WidgetDynamicTypeContext } from "@/widgets/core/context.ts";
import type { WidgetDynamicFormField } from "@/widgets/core/forms/dynamicForm.types.ts";
import { useForm } from "@mantine/form";
import {
  Accordion,
  ActionIcon,
  Badge,
  Box,
  Button,
  ColorInput,
  Group,
  NumberInput,
  Paper,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconPlus, IconQuestionMark, IconTrash } from "@tabler/icons-react";

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
      // For array fields, ensure we have an array and initialize nested items
      if (field.type === "array") {
        const arrayValue = (widget[field.key] ?? field.defaultValue ?? []) as never;
        values[field.key] = (Array.isArray(arrayValue) ? arrayValue : []) as never;
      } else {
        values[field.key] = widget[field.key] ?? field.defaultValue ?? null!;
      }
      return values;
    },
    { ...widget }, // Start with existing widget config,
  );

  // Build validation rules from field configurations
  const validate = provider.form.fields.reduce(
    (acc, field) => {
      // Add validation for the field itself
      if (field.validation) {
        acc[field.key] = field.validation as (value: unknown) => string | null;
      }

      // Add validation for nested fields in array types
      if (field.type === "array" && "items" in field) {
        field.items.forEach(nestedField => {
          if (nestedField.validation) {
            // Create a validator for the nested field path: fieldKey.*.nestedKey
            const nestedValidationKey =
              `${String(field.key)}.*.${String(nestedField.key)}` as keyof WidgetConfig;
            acc[nestedValidationKey] = nestedField.validation as (value: unknown) => string | null;
          }
        });
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
  // TODO: Refactor this messy render function, most likely into recursive version
  const renderField = (field: WidgetDynamicFormField) => {
    const commonProps = {
      label: field.label,
      placeholder: field.placeholder,
      description: field.description,
      withAsterisk: !!field.validation,
    };

    switch (field.type) {
      case "text":
        return (
          <TextInput
            key={form.key(field.key)}
            {...commonProps}
            {...form.getInputProps(field.key)}
          />
        );

      case "number":
        return (
          <NumberInput
            key={form.key(field.key)}
            {...commonProps}
            {...form.getInputProps(field.key)}
          />
        );

      case "boolean":
        return (
          <Switch
            key={form.key(field.key)}
            {...commonProps}
            {...form.getInputProps(field.key, { type: "checkbox" })}
          />
        );

      case "color":
        return (
          <ColorInput
            key={form.key(field.key)}
            {...commonProps}
            {...form.getInputProps(field.key)}
          />
        );

      case "array": {
        if (!("items" in field)) {
          return null;
        }
        const arrayValue = form.getValues()[field.key] as unknown as unknown[];
        const arrayError = form.errors[field.key];

        return (
          <Stack gap="xs" key={field.key}>
            <Group justify="space-between">
              <Box>
                <Text size="sm" fw={500}>
                  {field.label}
                  {field.validation && (
                    <Text component="span" c="red" ml={4}>
                      *
                    </Text>
                  )}
                </Text>
                {field.description && (
                  <Text size="xs" c="dimmed" mt={2}>
                    {field.description}
                  </Text>
                )}
              </Box>
              <Button
                size="xs"
                leftSection={<IconPlus size={16} />}
                onClick={() => {
                  const newItem = field.items.reduce(
                    (item, nestedField) => {
                      item[nestedField.key as string] = nestedField.defaultValue ?? "";
                      return item;
                    },
                    {} as Record<string, unknown>,
                  );
                  form.setFieldValue(field.key, [...(arrayValue ?? []), newItem] as never);
                }}>
                Add Item
              </Button>
            </Group>

            {arrayError && (
              <Text size="sm" c="red">
                {arrayError}
              </Text>
            )}

            {arrayValue && arrayValue.length > 0 ? (
              <Accordion variant="separated">
                {arrayValue.map((_, index) => (
                  <Accordion.Item key={`${field.key}-${index}`} value={`${field.key}-${index}`}>
                    <Accordion.Control>
                      <Group justify="space-between" wrap="nowrap">
                        <Text>Item {index + 1}</Text>
                        <Badge size="sm">{index + 1}</Badge>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Stack gap="md">
                        {field.items.map(nestedField => {
                          const nestedKey = `${field.key}.${index}.${String(nestedField.key)}`;
                          const nestedCommonProps = {
                            label: nestedField.label,
                            placeholder: nestedField.placeholder,
                            description: nestedField.description,
                            withAsterisk: !!nestedField.validation,
                          };

                          // Render nested fields based on type
                          let nestedFieldElement = null;
                          switch (nestedField.type) {
                            case "text":
                              nestedFieldElement = (
                                <TextInput
                                  key={nestedKey}
                                  {...nestedCommonProps}
                                  {...form.getInputProps(nestedKey)}
                                />
                              );
                              break;
                            case "number":
                              nestedFieldElement = (
                                <NumberInput
                                  key={nestedKey}
                                  {...nestedCommonProps}
                                  {...form.getInputProps(nestedKey)}
                                />
                              );
                              break;
                            case "boolean":
                              nestedFieldElement = (
                                <Switch
                                  key={nestedKey}
                                  {...nestedCommonProps}
                                  {...form.getInputProps(nestedKey, { type: "checkbox" })}
                                />
                              );
                              break;
                            case "color":
                              nestedFieldElement = (
                                <ColorInput
                                  key={nestedKey}
                                  {...nestedCommonProps}
                                  {...form.getInputProps(nestedKey)}
                                />
                              );
                              break;
                          }

                          return nestedFieldElement;
                        })}

                        <Group justify="flex-end">
                          <ActionIcon
                            color="red"
                            variant="light"
                            onClick={() => {
                              const newArray = arrayValue.filter((_, i) => i !== index);
                              form.setFieldValue(field.key, newArray as never);
                            }}>
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Group>
                      </Stack>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            ) : (
              <Text size="sm" c="dimmed" ta="center" py="md">
                No items added yet. Click &quot;Add Item&quot; to get started.
              </Text>
            )}
          </Stack>
        );
      }

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
        <Button type="submit">Save Widget</Button>
      </Group>
    </form>
  );
};
