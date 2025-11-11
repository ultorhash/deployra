import { Fragment, type JSX } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { emojiAvatarForAddress } from "@app-utils";
import {
  StyledHeaderAppBar,
  StyledHeaderBox, StyledHeaderButton,
  StyledHeaderDivider,
  StyledHeaderLogoBox,
  StyledHeaderStack,
  StyledHeaderTitleBox
} from "./styled";

export const Header = (): JSX.Element => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledHeaderAppBar position="static">
      <StyledHeaderStack direction="row">
        <StyledHeaderLogoBox>
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </StyledHeaderLogoBox>
        {!isSmall && (
          <StyledHeaderTitleBox>
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
          </StyledHeaderTitleBox>
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
                <StyledHeaderBox>
                  {!connected ? (
                    <StyledHeaderButton onClick={openConnectModal}>
                      <span>Connect Wallet</span>
                    </StyledHeaderButton>
                  ) : (
                    <Fragment>
                      {!isSmall && (
                         <Box>
                          <span>{account.balanceFormatted?.slice(0, 5)} {account.balanceSymbol}</span>
                        </Box>
                      )}
                      <StyledHeaderDivider
                        flexItem
                        orientation="vertical"
                      />
                      <StyledHeaderButton onClick={openChainModal}>
                        <img src={chain.iconUrl} alt={chain.name} style={{ width: 20, height: 20 }} />
                        <span>{chain.name}</span>
                      </StyledHeaderButton>
                      <StyledHeaderDivider
                        flexItem
                        orientation="vertical"
                      />
                      <StyledHeaderButton onClick={openAccountModal}>
                        <span>{account.displayName}</span>
                        {emojiAvatarForAddress(account.address).emoji}
                      </StyledHeaderButton>
                    </Fragment>
                  )}
                </StyledHeaderBox>
              </Box>
            )
          }}
        </ConnectButton.Custom>
      </StyledHeaderStack>
    </StyledHeaderAppBar>
  )
}
