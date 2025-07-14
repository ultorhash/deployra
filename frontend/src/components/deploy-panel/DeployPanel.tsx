import { useState, type JSX } from "react";
import { Avatar, Box, Card, CardHeader, Tooltip } from "@mui/material";

export const DeployPanel = (): JSX.Element => {
  const logos = ["base.png", "optimism.png", "unichain.png",
    "soneium.svg", "sonic.svg", "polygon.svg",
    "hyperEVM.svg", "sei.svg", "scroll.png",
    "lens.svg", "linea.png", "morph.svg",
    "berachain.svg", "abstract.png", "mantle.svg" 
  ];

  const rowSize = 7;
  
  const rows = Array.from({ length: Math.ceil(logos.length / rowSize) }, (_, rowIndex) =>
    logos.slice(rowIndex * rowSize, rowIndex * rowSize + rowSize)
  );
  
  const [activeLogo, setActiveLogo] = useState<string>("");

  const capitalize = (str: string) => str && str[0].toUpperCase() + str.slice(1);

  const handleClick = (logo: any) => {
    setActiveLogo(logo);
  };

  return (
    <Card sx={(theme) => ({
      p: 2,
      borderRadius: 2,
      backgroundColor: theme.palette.secondary.main
    })}>
      <CardHeader
        title={`Deploy your smart contract`}
        subheader={activeLogo
          ? `Selected chain: ${capitalize(activeLogo.replace(/\.(png|svg)$/i, ""))}`
          : 'Please select chain'
        }
        sx={{ textAlign: "center" }}
      />
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
      >
        {rows.map((row: string[], rowIndex: number) => (
          <Box display="flex" key={rowIndex} gap={2}>
            {row.map((logo: string, index: number) => (
              <Box key={index} width={44} height={44}>
                <Tooltip
                  title={capitalize(logo.replace(/\.(png|svg)$/i, ""))}
                  enterTouchDelay={0}
                >
                  <Avatar
                    alt={logo}
                    src={`/assets/logos/${logo}`}
                    onClick={() => handleClick(logo)}
                    sx={{
                      width: 44,
                      height: 44,
                      cursor: "pointer",
                      transition: "0.1s",
                      opacity: activeLogo === logo ? 1 : 0.4
                    }}
                  />
                </Tooltip>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Card>
  );
};
