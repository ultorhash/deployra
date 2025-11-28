import { styled } from '@mui/material/styles'
import { Card, ToggleButton, ToggleButtonGroup } from "@mui/material";

export const StyledTile = styled(Card)(({ theme }) => ({
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`
}));

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,

  '& .MuiToggleButtonGroup-middleButton, & .MuiToggleButtonGroup-lastButton': {
    marginLeft: 0,
    border: 0
  }
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: 0,
  border: 'none',
  color: theme.palette.text.secondary,

  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },

  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected
  },

  '&.Mui-selected:hover': {
    backgroundColor: theme.palette.action.hover
  }
}));
