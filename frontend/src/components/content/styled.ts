import { Box, BoxProps, styled, Toolbar } from '@mui/material';
import { headerHeightPx, sidebarWidthPx } from '@app-utils';

export const StyledContent = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  padding: 16,
  backgroundColor: theme.palette.background.default,

  [theme.breakpoints.up('sm')]: {
    width: `calc(100% - ${sidebarWidthPx}px)`,
  }
}));

export const ContentToolbar = styled(Toolbar)({
  minHeight: `${headerHeightPx}px !important`
});
