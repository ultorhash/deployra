import { styled } from '@mui/material/styles'
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface StyledToggleButtonProps {
  backgroundColor: string;
  textColor: string;
}

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  borderRadius: 0,

  '& .MuiToggleButtonGroup-middleButton, & .MuiToggleButtonGroup-lastButton': {
    marginLeft: 0,
    border: 0
  }
});

export const StyledToggleButton = styled(ToggleButton, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'textColor'
})<StyledToggleButtonProps>(({ backgroundColor, textColor, theme }) => ({
  borderRadius: 0,
  color: theme.palette.primary.contrastText,

  '&.Mui-selected': {
    color: theme.palette.primary.contrastText
  }
}));
