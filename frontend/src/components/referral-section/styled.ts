import { Box, Button, IconButton, styled, TextField } from "@mui/material";

export const ReferralSectionBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
});

export const ReferralSectionCharInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    width: 26,
    height: 32
  },
  "& .MuiInputBase-input": {
    padding: 0,
    textAlign: "center",
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
    textTransform: theme.typography.button.textTransform
  }
}));
