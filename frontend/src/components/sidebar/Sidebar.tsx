import { JSX } from 'react';
import { headerHeightPx } from '@app-utils';
import { Avatar, Divider, ListItem, ListItemText, Tooltip, Typography } from '@mui/material';
import { ChainBreakdown } from '@app-types';
import { deployOptions } from 'deploy-options';
import {
  StyledDrawer,
  SidebarContainer,
  SidebarListWrapper,
  SidebarList,
  SidebarListItemButton,
  SidebarListItemIcon,
  SidebarStatsWrapper,
  SidebarChip
} from './styled';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SquareIcon from '@mui/icons-material/Square';
import StarIcon from '@mui/icons-material/Star';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

interface SidebarProps {
  variant: "permanent" | "temporary";
  open: boolean;
  onTransitionEnd?: () => void;
  onClose?: () => void;
}

export const Sidebar = (props: SidebarProps): JSX.Element => {
  const { variant, open, onTransitionEnd, onClose } = props;

  const chainStats: ChainBreakdown[] = [
    { type: 'Total', count: deployOptions.length, color: '#0084D8' },
    { type: 'Mainnet', count: deployOptions.filter(o => o.type === "mainnet").length, color: '#1DB954' },
    { type: 'Testnet', count: deployOptions.filter(o => o.type === "testnet").length, color: '#FFD700' }
  ];

  const filterOptions = [
    {
      value: 'all',
      label: 'All',
      icon: <CalendarViewMonthIcon />
    },
    {
      value: 'hot',
      label: 'Hot',
      icon: <LocalFireDepartmentIcon sx={{ color: '#FF6E00' }} />
    },
    {
      value: 'new',
      label: 'New',
      icon: <AutoAwesomeIcon sx={{ color: '#1DB954' }} />
    },
    {
      value: 'baseLearn',
      label: 'Base Learn',
      icon: <SquareIcon sx={{ color: '#0000FF' }} />
    },
    {
      value: 'favorites',
      label: 'Favorites',
      icon: <StarIcon sx={{ color: '#FFD700' }} />
    }
  ];

  return (
    <StyledDrawer
      variant={variant}
      open={open}
      onTransitionEnd={onTransitionEnd}
      onClose={onClose}
      ModalProps={
        variant === 'temporary'
          ? {
              BackdropProps: {
                style: {
                  top: `${headerHeightPx}px`,
                  display: 'block',
                },
              },
            }
          : {}
      }
      sx={{
        display: {
          xs: variant === 'temporary' ? 'block' : 'none',
          sm: variant === 'permanent' ? 'block' : 'none',
        },
      }}
      slotProps={
        variant === 'permanent'
          ? {
              root: {
                keepMounted: true,
              },
            }
          : {}
      }
    >
      <SidebarContainer>
        <SidebarListWrapper>
          <SidebarList>
            {filterOptions.map((option) => (
              <ListItem
                disablePadding
                key={option.value}
              >
                <SidebarListItemButton>
                  <SidebarListItemIcon>{option.icon}</SidebarListItemIcon>
                  <ListItemText primary={option.label} />
                </SidebarListItemButton>
              </ListItem>
            ))}
          </SidebarList>
          <Divider sx={{ borderColor: 'white', mt: 1 }} />
        </SidebarListWrapper>
        <SidebarStatsWrapper>
          {chainStats.map((item) => (
            <Tooltip
              arrow
              key={item.type}
              title={item.type}
            >
              <SidebarChip
                label={item.count}
                avatar={
                  <Avatar sx={{ bgcolor: 'transparent' }}>
                    <ViewInArIcon sx={{ color: item.color }} />
                  </Avatar>
                }
              />
            </Tooltip>
          ))}
        </SidebarStatsWrapper>
        <Typography
          variant="caption"
          sx={{ textAlign: "center" }}
        >
          Version 2.0.1
        </Typography>
      </SidebarContainer>
    </StyledDrawer>
  );
}
