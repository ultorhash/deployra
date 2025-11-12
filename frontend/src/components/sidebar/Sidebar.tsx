import { JSX } from 'react';
import { headerHeightPx } from '@app-utils';
import { StyledDrawer } from './styled';

interface SidebarProps {
  variant: "permanent" | "temporary";
  open: boolean;
  onTransitionEnd?: () => void;
  onClose?: () => void;
}

export const Sidebar = (props: SidebarProps): JSX.Element => {
  const { variant, open, onTransitionEnd, onClose } = props;

  return (
    <StyledDrawer
      variant={variant}
      open={open}
      onTransitionEnd={onTransitionEnd}
      onClose={onClose}
      ModalProps={variant === "temporary" ? {
        BackdropProps: {
          style: {
            top: `${headerHeightPx}px`,
            display: 'block',
          },
        },
      } : {}}
      sx={{
        display: {
          xs: variant === "temporary" ? 'block' : 'none',
          sm: variant === "permanent" ? 'block' : 'none'
        }
      }}
      slotProps={variant === "permanent" ? {
        root: {
          keepMounted: true,
        },
      } : {}}
    >
      <span>Content</span>
    </StyledDrawer>
  );
}
