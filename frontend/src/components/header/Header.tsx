import { AppBar, Box } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { JSX } from "react";

export const Header = (): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ p: 1 }}
      >
        <Box sx={{ ml: 'auto' }}>
          <ConnectButton chainStatus="icon" />
        </Box>
      </AppBar>
    </Box>
  )
}
