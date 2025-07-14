import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { JSX } from "react";

export const Header = (): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontStyle: 'italic' }}
          >
            Mintro
          </Typography>
          <ConnectButton chainStatus="icon" />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
