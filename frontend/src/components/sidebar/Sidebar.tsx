import { JSX, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Avatar, Box, Button, Divider, IconButton, ListItem, ListItemText, TextField, Tooltip, Typography } from '@mui/material';
import { headerHeightPx } from '@app-utils';
import { ChainBreakdown } from '@app-types';
import { deployOptions } from 'deploy-options';
import {
  StyledDrawer,
  SidebarContainer,
  SidebarListsWrapper,
  SidebarFilterList,
  SidebarListButton,
  SidebarFilterListItemIcon,
  SidebarStatsWrapper,
  SidebarChip,
  SidebarButton,
  SidebarCharBox,
  SidebarIconButton,
  SidebarCodeBox,
  SidebarReferralBox,
  SidebarBindButton,
  SidebarCharInput
} from './styled';
import GridOnIcon from '@mui/icons-material/GridOn';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SquareIcon from '@mui/icons-material/Square';
import StarIcon from '@mui/icons-material/Star';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import XIcon from '@mui/icons-material/X';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IosShareIcon from '@mui/icons-material/IosShare';

interface SidebarProps {
  variant: "permanent" | "temporary";
  open: boolean;
  filterValue: string;
  onFilterChange: (value: string) => void;
  onTransitionEnd?: () => void;
  onClose?: () => void;
}

export const Sidebar = (props: SidebarProps): JSX.Element => {
  const { variant, open, filterValue, onTransitionEnd, onClose, onFilterChange } = props;

  const [inputChars, setInputChars] = useState(Array(6).fill(""));

  const generatedCode = "L72D13";
  const inputCode = inputChars.join("");
  const isCodeComplete = inputChars.every((c) => c !== "") && inputCode.length === 6;

  const chainStats: ChainBreakdown[] = [
    { type: 'Total', count: deployOptions.length, color: '#0084D8' },
    { type: 'Mainnet', count: deployOptions.filter(o => o.type === "mainnet").length, color: '#1DB954' },
    { type: 'Testnet', count: deployOptions.filter(o => o.type === "testnet").length, color: '#FFD700' }
  ];

  const filterOptions = [
    {
      value: 'all',
      label: 'All',
      icon: <GridOnIcon sx={{ color: (theme) => theme.palette.text.primary }} />
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

  const handleCharChange = (index: number, value: string) => {
    let char = value.slice(0, 1).toUpperCase();
    if (!/^[A-Z0-9]$/.test(char)) {
      char = ""
    };

    const newChars = [...inputChars];
    newChars[index] = char;
  
    setInputChars(newChars);

    if (char && index < inputChars.length - 1) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  
    const pasted = e.clipboardData.getData("text").toUpperCase();
    const chars = pasted.slice(0, 6).split("");
    const newChars = Array(6).fill("");
    chars.forEach((c, i) => {
      if (/^[A-Z0-9]$/.test(c)) newChars[i] = c;
    });
  
    setInputChars(newChars);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Backspace" && inputChars[index] === "") {
      if (index > 0) {
        const newChars = [...inputChars];
        newChars[index - 1] = "";
        setInputChars(newChars);
        document.getElementById(`code-input-${index - 1}`)?.focus();
      }
    }
  };

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
        <SidebarListsWrapper>
          <SidebarFilterList>
            {filterOptions.map((option) => (
              <ListItem
                disablePadding
                key={option.value}
              >
                <SidebarListButton
                  onClick={() => onFilterChange(option.value)}
                  sx={{
                    backgroundColor: (theme) => {
                      return filterValue === option.value ? theme.palette.action.active : 'unset'
                    }
                  }}
                >
                  <SidebarFilterListItemIcon>{option.icon}</SidebarFilterListItemIcon>
                  <ListItemText primary={option.label} />
                </SidebarListButton>
              </ListItem>
            ))}
          </SidebarFilterList>
          <Divider sx={{ borderColor: (theme) => theme.palette.divider }} />
          <SidebarFilterList>
            <SidebarListButton onClick={() => window.open('https://x.com/deployraxyz', '_blank')}>
              <SidebarFilterListItemIcon>
                <XIcon sx={{ color: (theme) => theme.palette.text.primary }} />
              </SidebarFilterListItemIcon>
              <ListItemText primary="Follow us!" />
            </SidebarListButton>
          </SidebarFilterList>
          <Divider sx={{ borderColor: (theme) => theme.palette.divider }} />
          <SidebarReferralBox>
            {/* <SidebarListButton onClick={() => window.open('https://x.com/deployraxyz', '_blank')}>
              <SidebarFilterListItemIcon>
                <PeopleAltIcon sx={{ color: (theme) => theme.palette.text.primary }} />
              </SidebarFilterListItemIcon>
              <ListItemText primary="Generate Ref Code" />
            </SidebarListButton> */}
            <SidebarCodeBox>
              <Box display="flex" gap={1}>
                {inputChars.map((char, index) => (
                  <SidebarCharInput
                    id={`code-input-${index}`}
                    autoComplete="off"
                    key={index}
                    value={char}
                    onChange={(e) => handleCharChange(index, e.target.value)}
                    onPaste={index === 0 ? handleCodePaste : undefined}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                ))}
              </Box>
              <SidebarBindButton disabled={!isCodeComplete}>
                <Typography variant="button">Bind</Typography>
              </SidebarBindButton>
            </SidebarCodeBox>
            <SidebarCodeBox>
              <Box
                display="flex"
                gap={1}
              >
                {generatedCode.split("").map((char, index) => (
                  <SidebarCharBox key={index}>
                    <Typography variant="button">{char}</Typography>
                  </SidebarCharBox>
                ))}
              </Box>
              <Box
                display="flex"
                gap={1}
              >
                <Tooltip
                  arrow
                  title="Copy code"
                >
                  <SidebarIconButton onClick={() => {
                    navigator.clipboard.writeText(generatedCode);
                    enqueueSnackbar('Referral code copied!', { variant: 'success' });
                  }}>
                    <ContentCopyIcon sx={{ fontSize: 16 }} />
                  </SidebarIconButton>
                </Tooltip>
                <Tooltip
                  arrow
                  title="Share link"
                >
                  <SidebarIconButton onClick={() => {
                    navigator.clipboard.writeText(`https://app.deployra.xyz?ref=${generatedCode}`);
                    enqueueSnackbar('Referral link copied!', { variant: 'success' });
                  }}>
                    <IosShareIcon sx={{ fontSize: 16 }} />
                  </SidebarIconButton>
                </Tooltip>
              </Box>
            </SidebarCodeBox>
          </SidebarReferralBox>
        </SidebarListsWrapper>
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
          sx={{ textAlign: "center", mb: 0.5 }}
        >
          Version 2.0.3
        </Typography>
      </SidebarContainer>
    </StyledDrawer>
  );
}
