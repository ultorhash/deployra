import type { JSX } from "react";
import { AppBar, Box, Toolbar, Typography, useTheme } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ width: 44, height: 44, mr: 1 }}>
            <img
              src="/assets/icons/rocket.svg"
              alt="logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>
           <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="p">
              Deployra
            </Typography>
            <Typography variant="caption" component="p" sx={{ color: theme.palette.text.secondary }}>
              Your smart contracts
            </Typography>
          </Box>
          <ConnectButton chainStatus="icon" />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
