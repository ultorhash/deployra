import styled from "@emotion/styled";
import { Card, CardContent } from "@mui/material";
import { keyframes } from "@emotion/react";

const spinAround = keyframes`
  from {
    --degree: 0deg;
  }
  to {
    --degree: 360deg;
  }
`;

export const StyledCard = styled(Card)<{ color: string }>(({ color }) => ({
  // position: "relative",
  // borderRadius: "12px",
  // padding: "10px",
  // animation: `${spinAround} 4s linear infinite`,
  // zIndex: 0,

  // "&::after": {
  //   content: "''",
  //   position: "absolute",
  //   inset: "3px",
  //   borderRadius: "inherit",
  //   backgroundColor: "inherit",
  //   zIndex: -1,
  // },

  // "&::before": {
  //   content: "''",
  //   position: "absolute",
  //   inset: "-6px",
  //   borderRadius: "inherit",
  //   backgroundImage: `
  //     conic-gradient(
  //       from var(--degree),
  //       transparent,
  //       transparent,
  //       transparent,
  //       ${color}
  //     )
  //   `,
  //   animation: `${spinAround} 15s linear infinite`,
  //   zIndex: -1,
  //   opacity: 0.8,
  // },
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  
}));
