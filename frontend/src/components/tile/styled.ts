import { styled } from '@mui/material/styles'
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface StyledToggleButtonProps {
  backgroundColor: string;
  textColor: string;
}

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  borderRadius: 0
});

export const StyledToggleButton = styled(ToggleButton, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'textColor'
})<StyledToggleButtonProps>(({ backgroundColor, textColor }) => ({
  borderRadius: 0,
  color: textColor,
  backgroundColor: `${backgroundColor}70`,

  '&.Mui-selected': {
    color: textColor,
    backgroundColor: backgroundColor
  }
}));
