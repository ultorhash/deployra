import type { JSX } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = (): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ width: 32, height: 32, mr: 1 }}>
            <img
              src="/assets/icons/rocket.svg"
              alt="logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Deployra
          </Typography>
          <ConnectButton chainStatus="icon" />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
