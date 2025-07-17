import { Fragment, type JSX } from 'react';
import { Box } from '@mui/material';
import { Header, DeployPanel, Footer } from "@app-components";

export const App = (): JSX.Element => {
  return (
    <Fragment>
      <Header />
      <Box
        sx={(theme) => ({
          position: 'relative',
          height: 'calc(100vh - 64px - 56px)',
          background: 'linear-gradient(0deg, #0A0A0F 0%, #1E2C4D 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          '@keyframes twinkle': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.3 }
          }
        })}
      >
        {[...Array(100)].map((_, i: number) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: '2px',
              height: '2px',
              borderRadius: '50%',
              backgroundColor: 'white',
              opacity: 0.8,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`
            }}
          />
        ))}
        <DeployPanel />
      </Box>
      <Footer />
    </Fragment>
  )
}
