import { FieldValues } from "react-hook-form";
import { Config } from "wagmi";
import { ConnectMutate } from "wagmi/query";

export type FormProps = {
  isConnected: boolean;
  isPending: boolean;
  isOptionSelected: boolean;
  onSubmit: (data: FieldValues) => Promise<void>;
  connect: ConnectMutate<Config, unknown>;
  getButtonText: () => string;
}
