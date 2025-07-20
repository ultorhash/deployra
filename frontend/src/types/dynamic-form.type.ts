export type FieldConfig = {
  name: string;
  placeholder: string;
  required?: boolean;
  defaultValue: string;
};

export type DynamicFormProps = {
  fields: FieldConfig[];
  disabled: boolean;
  getButtonText: () => string;
  onSubmit: (data: Record<string, string>) => void;
};
