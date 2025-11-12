import { Drawer, styled, Toolbar } from "@mui/material";
import { headerHeightPx, sidebarWidthPx } from "@app-utils";

export const StyledToolbar = styled(Toolbar)({
  minHeight: `${headerHeightPx}px !important`
});

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    boxShadow: 'none'
  },

  '& .MuiDrawer-paper': {
    boxShadow: 'none',
    boxSizing: 'border-box',
    width: sidebarWidthPx,
    top: `${headerHeightPx}px`,
    borderRight: `1px solid ${theme.palette.text.primary}`
  },
}));
