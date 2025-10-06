import {  Grid } from "@mui/material";
import { Tile } from "@app-components";
import { DeployOption } from "@app-types";
import { deployOptions } from "./data";

export const ChainTiles = () => {
  return (
    <Grid
      container
      rowSpacing={{ xs: 1, sm: 2, md: 3 }}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      {deployOptions.map((option: DeployOption, index) => (
        <Grid
          key={index}
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
        >
          <Tile {...option} />
        </Grid>
      ))}
    </Grid>
  );
};
