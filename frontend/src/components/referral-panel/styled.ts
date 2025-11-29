import { Box, Button, IconButton, styled, TextField } from "@mui/material";

export const ReferralPanelBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  margin: 16,
  gap: 8
});

export const ReferralActionButton = styled(Button)(({ theme }) => ({
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

export const ReferralIconButton = styled(IconButton)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: 4,
  backgroundColor: theme.palette.action.selected,
  color: theme.palette.text.secondary,

  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}));
