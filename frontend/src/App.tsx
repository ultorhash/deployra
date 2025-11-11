import { Fragment, type JSX } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Header, Footer, ChainTiles } from "@app-components";

export const App = (): JSX.Element => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Fragment>
      <Header />
      <Box
        sx={{
          position: 'relative',
          height: isSmall ? 'calc(100vh - 56px - 105px)' : 'calc(100vh - 64px - 48px)',
          background: 'linear-gradient(0deg, #0A0A0F 0%, #1E2C4D 100%)',
          overflowY: 'auto',
          padding: { xs: 1, sm: 2, md: 3 }
        }}
      >
        <ChainTiles />
      </Box>
      <Footer />
    </Fragment>
  )
}
