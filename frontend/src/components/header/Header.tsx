import type { JSX } from "react";
import { AppBar, Box, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = (): JSX.Element => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ width: 44, height: 44, mr: 1 }}>
            <img
              src="/assets/icons/logo.svg"
              alt="logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 10 }}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap={0.5}
            sx={{ flexGrow: 1 }}
          >
            <Typography
              variant="h6"
              sx={{ lineHeight: 1 }}
            >
              Deployra
            </Typography>
            {!isSmall && (
              <Typography
                variant="caption"
                component="p"
                sx={{ color: theme.palette.text.secondary, lineHeight: 1 }}
              >
                Your smart contracts
              </Typography>
            )}
          </Box>
          <ConnectButton chainStatus="icon" />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
