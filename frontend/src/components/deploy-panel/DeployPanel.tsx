import { Fragment, useState, type JSX } from "react";
import { Avatar, Box, Card, CardHeader, Tooltip } from "@mui/material";
import { DeployOption } from "@app-types";
import { deployOptions } from "./data";

export const DeployPanel = (): JSX.Element => {

  const rowSize = 7;
  
  const rows = Array.from({ length: Math.ceil(deployOptions.length / rowSize) }, (_, rowIndex) =>
    deployOptions.slice(rowIndex * rowSize, rowIndex * rowSize + rowSize)
  );
  
  const [chain, setChain] = useState<string>("");

  const capitalize = (str: string) => str && str[0].toUpperCase() + str.slice(1);

  const handleClick = (chain: string) => {
    setChain(chain);
  };

  return (
    <Card sx={(theme) => ({
      p: 2,
      borderRadius: 2,
      backgroundColor: theme.palette.secondary.main
    })}>
      <CardHeader
        title={`Deploy your smart contract`}
        subheader={chain ? `Selected chain: ${chain}` : 'Please select chain'}
        sx={{ textAlign: "center" }}
      />
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
      >
        {rows.map((row: DeployOption[], rowIndex: number) => (
          <Box display="flex" key={rowIndex} gap={2}>
            {row.map((option: DeployOption, index: number) => (
              <Box key={index} width={44} height={44}>
                <Tooltip
                  title={
                    <Fragment>
                      <p style={{ margin: 0 }}>{option.chain}</p>
                      <p style={{ margin: 0 }}>Fee: {option.fee}</p>
                    </Fragment>
                  }
                  enterTouchDelay={0}
                >
                  <Avatar
                    alt={option.chain}
                    src={`/assets/logos/${option.icon}`}
                    onClick={() => handleClick(option.chain)}
                    sx={{
                      width: 44,
                      height: 44,
                      cursor: "pointer",
                      transition: "0.1s",
                      opacity: chain === option.chain ? 1 : 0.4
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
