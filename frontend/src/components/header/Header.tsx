import type { JSX } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from './assets/icons/logo.svg';

export const Header = (): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ width: 24, height: 24, mr: 1 }}>
            <img
              src="/assets/icons/logo.svg"
              alt="logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontStyle: 'italic' }}
          >
            Deployra
          </Typography>
          <ConnectButton chainStatus="icon" />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
