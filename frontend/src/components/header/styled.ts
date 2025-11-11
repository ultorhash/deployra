import { styled, Button, Divider, Box, AppBar, Stack } from "@mui/material";

export const StyledHeaderAppBar = styled(AppBar)(({ theme }) => ({
  height: 60,
  padding: '0 8px',
  borderBottom: `1px solid ${theme.palette.text.primary}`
}));

export const StyledHeaderStack = styled(Stack)({
  height: '100%'
});

export const StyledHeaderLogoBox = styled(Box)({
  width: 40,
  height: 60,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

export const StyledHeaderTitleBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 6,
  flexGrow: 1,
  marginLeft: 8
});

export const StyledHeaderBox = styled(Box)({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
});

export const StyledHeaderButton = styled(Button)(({ theme }) => ({
  gap: 8,
  color: theme.palette.text.primary,
  backgroundColor: 'transparent'
}));

export const StyledHeaderDivider = styled(Divider)(({ theme }) => ({
  margin: '0 8px',
  borderColor: theme.palette.text.primary
}));
