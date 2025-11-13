import { JSX, useMemo, useState } from "react";
import { StyledContent, ContentToolbar } from "./styled";
import { Grid, IconButton, TextField } from "@mui/material";
import { deployOptions } from "deploy-options";
import { BaseLearnTile, Tile } from "@app-components";
import { DeployOption } from "@app-types";
import CloseIcon from '@mui/icons-material/Close';

interface ContentProps {
  filterValue: string | null;
}

export const Content = (props: ContentProps): JSX.Element => {
  const { filterValue } = props;

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredOptions = useMemo(() => {
    let base = deployOptions;

    if (filterValue === "hot") {
      base = base.filter((option) => option.tags.includes("hot"));
    } else if (filterValue === "new") {
      base = base.filter((option) => option.tags.includes("new"));
    } else if (filterValue === "baseLearn") {
      base = base.filter((option) => option.tags.includes("baseLearn"));
    } else if (filterValue === "favorites") {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");
      base = base.filter((option) => favorites[option.chainId] === true);
    }

    if (searchValue.trim()) {
      const query = searchValue.toLowerCase();
      base = base.filter((option: DeployOption) =>
        option.chain.toLowerCase().includes(query) ||
        String(option.chainId).includes(query)
      );
    }

    return base;
  }, [filterValue, searchValue]);

  return (
    <StyledContent component="main">
      <ContentToolbar />
      <TextField
        fullWidth
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search by name or ID..."
        sx={{ mb: 2 }}
        slotProps={{
          input: {
            endAdornment: searchValue && (
              <IconButton
                size="small"
                edge="end"
                onClick={() => setSearchValue('')}
              >
                <CloseIcon />
              </IconButton>
            )
          }
        }}
      />
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
      >
        {filteredOptions.map((option, index) => (
          <Grid
            key={index}
            size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}
          >
            {option.tags.includes("baseLearn")
              ? <BaseLearnTile {...option} />
              : <Tile {...option} />
            }
          </Grid>
        ))}
      </Grid>
    </StyledContent>
  );
}
