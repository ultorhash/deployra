import { Box, BoxProps, styled, Toolbar } from '@mui/material';
import { headerHeightPx, sidebarWidthPx } from '@app-utils';

export const StyledContent = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100%',
  flexGrow: 1,
  padding: 16,

  [theme.breakpoints.up('sm')]: {
    width: `calc(100% - ${sidebarWidthPx}px)`,
  }
}));

export const ContentToolbar = styled(Toolbar)({
  minHeight: `${headerHeightPx}px !important`
});
