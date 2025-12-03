import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { SnackbarProvider } from 'notistack';
import { darkTheme, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from "@vercel/analytics/react";
import { Fade } from '@mui/material';
import { chains } from 'chains/index.ts';
import { App } from './App.tsx';

import CssBaseline from '@mui/material/CssBaseline';
import '@rainbow-me/rainbowkit/styles.css';

const config = getDefaultConfig({
  appName: 'Deployra',
  projectId: 'eed77281a9b574399a9cfe910e50cbaf',
  ssr: false,
  chains: chains,
});

const queryClient = new QueryClient();

const rainbowKitTheme = {
  ...darkTheme({
    accentColor: '#7D78FD',
    accentColorForeground: 'white',
    borderRadius: 'medium'
  })
};

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={rainbowKitTheme}>
          <SnackbarProvider
            maxSnack={5}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            TransitionComponent={Fade}
          >
            <CssBaseline />
            <App />
            <Analytics />
          </SnackbarProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </BrowserRouter>
);
