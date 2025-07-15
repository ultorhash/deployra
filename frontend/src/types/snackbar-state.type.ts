import { AlertColor } from "@mui/material";

export type SnackbarState = {
  open: boolean;
  message: string;
  severity: AlertColor;
}
