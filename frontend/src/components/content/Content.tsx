import { JSX, useMemo } from "react";
import { MainToolbar, StyledMain } from "./styled";
import { Box, Grid, Typography } from "@mui/material";
import { deployOptions } from "deploy-options";
import { BaseLearnTile, Tile } from "@app-components";

export const Content = (): JSX.Element => {
  

  return (
    <StyledMain component="main">
      <MainToolbar />
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
      >
        {deployOptions.length === 0
          ? <Box
              sx={{
                width: '100%',
                height: '100%',
                p: 2,
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 2
              }}>
                <Typography>No "filter" chains</Typography>
            </Box>
          : deployOptions.map((option, index) => (
              <Grid
                key={index}
                size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}
              >
                {option.tags.includes("baseLearn")
                  ? <BaseLearnTile {...option} />
                  : <Tile {...option} />
                }
              </Grid>
            ))
        }
      </Grid>
    </StyledMain>
  );
}
