import { JSX } from "react";
import { Dialog } from "@mui/material";

interface ModalOptionalProps {
  onConfirmText?: string;
  onCancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalProps extends ModalOptionalProps {
  open: boolean;
  title: string;
  message: string;
  closeText: string;
  onClose: () => void;
}

export const Modal = (props: ModalProps): JSX.Element => {
  const { open, onClose } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      Test
    </Dialog>
  )
}
