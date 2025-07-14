import { Fragment, type JSX } from 'react';
import { Box } from '@mui/material';
import { Header, DeployPanel, Footer } from './components';

export const App = (): JSX.Element => {
  return (
    <Fragment>
      <Header />
      <Box
        sx={(theme) => ({
          height: 'calc(100vh - 64px - 56px)',
          backgroundColor: theme.palette.secondary.main,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <DeployPanel />
      </Box>

      <Footer />
    </Fragment>
  )
}
