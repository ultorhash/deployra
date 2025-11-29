import { Box, Button, Chip, Drawer, IconButton, List, ListItemButton, ListItemIcon, styled, TextField, Theme, Toolbar } from "@mui/material";
import { buttonBorderRadius, headerHeightPx, sidebarWidthPx } from "@app-utils";

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    boxShadow: 'none',
    boxSizing: 'border-box',
    width: sidebarWidthPx,
    top: `${headerHeightPx}px`,
    height: `calc(100vh - ${headerHeightPx}px)`,
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('sm')]: {
      borderRight: `1px solid ${theme.palette.divider}`,
    }
  }
}));

export const SidebarContainer = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingBottom: '8px 0'
});

export const SidebarListsWrapper = styled(Box)({
  flex: '1 1 auto'
});

export const SidebarFilterList = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8
});

export const SidebarListButton = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: '0 8px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: `${buttonBorderRadius}px`
}));

export const SidebarFilterListItemIcon = styled(ListItemIcon)({
  minWidth: 0,
  marginRight: 16
});

export const SidebarStatsWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-evenly',
  gap: 8,
  marginBottom: 8
});

export const SidebarChip = styled(Chip)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: 8
}));
