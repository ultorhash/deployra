import { JSX } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import X from "@mui/icons-material/X";

export const Footer = (): JSX.Element => {
  return (
    <BottomNavigation sx={(theme) => ({
      position: 'fixed',
      display: 'flex',
      justifyContent: 'flex-end',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.palette.primary.main,
      p: 1
    })}>
      <BottomNavigationAction
        label="X"
        icon={<X />}
        sx={{
          minWidth: 40,
          maxWidth: 40,
          borderRadius: 2
        }}
      />
    </BottomNavigation>
  )
}
