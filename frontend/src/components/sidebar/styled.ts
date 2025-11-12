import { Drawer, styled, Toolbar } from "@mui/material";
import { headerHeightPx } from "@app-utils";

export const StyledToolbar = styled(Toolbar)({
  minHeight: `${headerHeightPx}px !important`
});

export const StyledDrawer = styled(Drawer)({
  '& .MuiPaper-root': {
    boxShadow: 'none'
  }
});
