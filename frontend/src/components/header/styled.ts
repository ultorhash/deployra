import { headerHeightPx, logoSizePx } from "@app-utils";
import { Box, Button, Divider, styled, Toolbar } from "@mui/material";

export const StyledHeaderToolbar = styled(Toolbar)({
  minHeight: `${headerHeightPx}px !important`,
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 12px !important'
});

export const StyledHeaderLogoBox = styled(Box)({
  width: logoSizePx,
  height: logoSizePx,
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
  height: `${headerHeightPx}px`,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const StyledHeaderButton = styled(Button)(({ theme }) => ({
  gap: 8,
  color: theme.palette.text.primary,
  backgroundColor: 'transparent'
}));

export const StyledHeaderDivider = styled(Divider)(({ theme }) => ({
  margin: '0 4px',
  borderColor: theme.palette.text.primary
}));
