import styled from "@emotion/styled";
import { Tabs, ToggleButton } from "@mui/material";

export const StyledTabs = styled(Tabs)({
  height: 40,
  minHeight: 40,

  '& .MuiTabs-indicator': {
    display: 'none',
  },
  '& .MuiTab-root': {
    minHeight: 40,
    paddingTop: 0,
    paddingBottom: 0,
  }
});

export const StyledTileBadge = styled(ToggleButton)<{
  top: number;
  text: string;
}>(({ top, text }) => {
  let gradient: string;

  switch (text.toLowerCase()) {
    case 'hot':
      gradient = 'linear-gradient(45deg, #EF7000, #FA0000)';
      break;
    case 'new':
      gradient = 'linear-gradient(45deg, #56fcad, #009d6d)';
      break;
    default:
      gradient = 'linear-gradient(45deg, #000, #000)';
      break;
  }

  return {
    position: 'absolute',
    zIndex: 1,
    top: top,
    right: -10,
    color: 'white',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: '4px 6px',
    fontSize: '0.7rem',
    gap: '4px',
    minWidth: '4rem',
    textTransform: 'none',
    backgroundImage: gradient,
    backgroundColor: 'transparent',
    backgroundClip: 'padding-box',

    '& svg': {
      fontSize: '1rem',
    },

    '&.Mui-selected': {
      backgroundImage: gradient,
      backgroundColor: 'transparent',
    },
  };
});
