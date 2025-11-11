import { JSX } from "react";
import { BottomNavigationAction, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ChainBreakdown } from "@app-types";
import { deployOptions } from "deploy-options";
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import X from "@mui/icons-material/X";

export const Footer = (): JSX.Element => {
  const chainStats: ChainBreakdown[] = [
    { type: 'Total', count: deployOptions.length, color: '#0084D8' },
    { type: 'Mainnet', count: deployOptions.filter(o => o.type === "mainnet").length, color: '#1DB954' },
    { type: 'Testnet', count: deployOptions.filter(o => o.type === "testnet").length, color: '#FFD700' }
  ];

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={(theme) => ({
        height: isSmall ? 105 : 48,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.palette.secondary.main,
        p: 1,
        display: 'flex',
        flexDirection: isSmall ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isSmall ? 'flex-start' : 'center',
        gap: isSmall ? 2 : 0
      })}
    >
      <Box
        gap={2}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent={isSmall ? "center" : "flex-start"}
        sx={{ width: '100%' }}
      >
        {chainStats.map((item) => (
          <Box
            key={item.type}
            gap={0.5}
            display="flex"
            alignItems="center"
          >
            <Typography variant="body2">{`${item.type}: ${item.count}`}</Typography>
            <ViewInArIcon sx={{ color: item.color }} />
          </Box>
        ))}
      </Box>
      <Box
        gap={2}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent={isSmall ? "center" : "flex-end"}
        sx={{ width: '100%' }}
      >
        <Typography>Follow us on X!</Typography>
        <BottomNavigationAction
          label="X"
          icon={<X sx={{ fontSize: '1rem' }} />}
          sx={(theme) => ({
            maxWidth: '2rem',
            minWidth: '2rem',
            height: '2rem',
            borderRadius: 2,
            color: theme.palette.primary.contrastText,
            backgroundColor: '#000'
          })}
          onClick={() => window.open('https://x.com/deployraxyz', '_blank')}
        />
      </Box>
    </Box>
  );
}
