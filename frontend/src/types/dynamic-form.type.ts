import { Config } from "wagmi";
import { ConnectMutate } from "wagmi/query";

export type FieldConfig = {
  name: string;
  placeholder: string;
  required?: boolean;
  defaultValue: string;
};

export type DynamicFormProps = {
  fields: FieldConfig[];
  disabled: boolean;
  isConnected: boolean;
  color: string;
  textColor: string;
  connect: ConnectMutate<Config, unknown>;
  getButtonText: () => string;
  onSubmit: (data: Record<string, string>) => void;
};
