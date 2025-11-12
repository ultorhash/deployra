import { Fragment, JSX } from "react";
import { AppBar, Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { emojiAvatarForAddress, sidebarWidthPx } from "@app-utils";
import MenuIcon from '@mui/icons-material/Menu';
import {
  HeaderBox,
  HeaderButton,
  HeaderDivider,
  HeaderLogoBox,
  HeaderThemeSwitch,
  HeaderTitleBox,
  HeaderToolbar
} from "./styled";

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
}

export const Header = (props: HeaderProps): JSX.Element => {
  const { onToggleSidebar, onToggleTheme } = props;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="fixed"
      sx={{
        ml: { sm: `${sidebarWidthPx}px` },
        boxShadow: 'none',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: (theme) => `1px solid ${theme.palette.text.primary}`
      }}
    >
      <HeaderToolbar>
        <IconButton
          color="inherit"
          aria-label="open sidebar"
          edge="start"
          onClick={onToggleSidebar}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        {!isSmall && (
          <Fragment>
            <HeaderLogoBox>
              <img
                src="/assets/icons/logo.svg"
                alt="logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </HeaderLogoBox>
            <HeaderTitleBox>
              <Typography
                variant="h6"
                sx={{ lineHeight: 1 }}
              >
                Deployra
              </Typography>
              <Typography
                variant="caption"
                component="p"
                sx={{
                  lineHeight: 1,
                  color: theme.palette.text.secondary
                }}
              >
                Your smart contracts
              </Typography>
            </HeaderTitleBox>
          </Fragment>
        )}
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted
          }) => {
            const ready = mounted && authenticationStatus !== 'loading'
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus || authenticationStatus === 'authenticated')

            return (
              <Box
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }
                })}
              >
                <HeaderBox>
                  <HeaderThemeSwitch
                    defaultChecked
                    onClick={onToggleTheme}
                    sx={{ m: 1 }}
                  />
                  <HeaderDivider
                    flexItem
                    orientation="vertical"
                  />
                  {!connected ? (
                    <HeaderButton onClick={openConnectModal}>
                      <span>Connect Wallet</span>
                    </HeaderButton>
                  ) : (
                    <Fragment>
                      <HeaderButton onClick={openChainModal}>
                        <img
                          src={chain.iconUrl}
                          alt={chain.name}
                          style={{ width: 20, height: 20 }}
                        />
                        {!isSmall && (
                          <Typography>{chain.name}</Typography>
                        )}
                      </HeaderButton>
                      <HeaderDivider
                        flexItem
                        orientation="vertical"
                      />
                      <HeaderButton onClick={openAccountModal}>
                        <Box>
                          <Box>
                            <Typography variant="inherit">
                              {account.displayName} {emojiAvatarForAddress(account.address).emoji}
                            </Typography>
                          </Box>
                          <Typography variant="caption">
                            {account.balanceFormatted?.slice(0, 5)} {account.balanceSymbol}
                          </Typography>
                        </Box>
                      </HeaderButton>
                    </Fragment>
                  )}
                </HeaderBox>
              </Box>
            )
          }}
        </ConnectButton.Custom>
      </HeaderToolbar>
    </AppBar>
  )
}
