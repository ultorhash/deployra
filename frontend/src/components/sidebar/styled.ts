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

export const SidebarButton = styled(Button)(({ theme }) => ({
  width: '50%',
  borderRadius: `${buttonBorderRadius}px`,
  backgroundColor: 'lime'
}));

export const SidebarFilterListItemIcon = styled(ListItemIcon)({
  minWidth: 0,
  marginRight: 16
});

export const SidebarReferralBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  margin: 16,
  gap: 8
});

export const SidebarCodeBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
});

export const SidebarCharInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    width: 26,
    height: 32
  },
  "& .MuiInputBase-input": {
    padding: 0,
    textAlign: "center",
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
    textTransform: theme.typography.button.textTransform
  }
}));

export const SidebarCharBox = styled(Box)(({ theme }) => ({
  width: 26,
  height: 32,
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4
}));

export const SidebarBindButton = styled(Button)(({ theme }) => ({
  width: 72,
  height: 32,
  backgroundColor: theme.palette.action.selected,
  color: theme.palette.text.secondary,

  "&:hover": {
    backgroundColor: theme.palette.action.hover
  },

  "&.Mui-disabled": {
    cursor: "not-allowed",
    pointerEvents: "auto",
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled
  },

  "&.Mui-disabled:hover": {
    backgroundColor: theme.palette.action.disabledBackground
  }
}));

export const SidebarIconButton = styled(IconButton)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: 4,
  backgroundColor: theme.palette.action.selected,
  color: theme.palette.text.secondary,

  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}));

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
