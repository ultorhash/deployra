import { Card, styled } from "@mui/material";

export const StyledBaseLearnTile = styled(Card)(({ theme }) => ({
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`
}));
