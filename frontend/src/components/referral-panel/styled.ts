import { Box, Button, IconButton, styled, TextField } from "@mui/material";

export const ReferralPanelBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  margin: 16,
  gap: 8
});

export const CodeBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
});

export const CharBox = styled(Box)(({ theme }) => ({
  width: 26,
  height: 32,
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4
}));

export const CharTextField = styled(TextField)(({ theme }) => ({
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

export const BindButton = styled(Button)(({ theme }) => ({
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
