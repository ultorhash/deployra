import { createRoot } from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { darkTheme, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { chains } from 'chains/index.ts';
import { theme } from './theme';
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
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider theme={rainbowKitTheme}>
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </SnackbarProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
