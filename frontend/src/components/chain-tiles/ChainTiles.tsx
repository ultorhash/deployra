import { Fragment, useMemo, useState } from "react";
import { Box, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import { BaseLearnTile, Tile } from "@app-components";
import { DeployOption } from "@app-types";
import { deployOptions } from "../../deploy-options";
import useMediaQuery from '@mui/material/useMediaQuery';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StarIcon from '@mui/icons-material/Star';
import SquareIcon from '@mui/icons-material/Square';

export const ChainTiles = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const [searchValue, setSearchValue] = useState<string>("");
  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("chainFilter") || "all";
  });

  const handleFilterChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: string | null
  ) => {
    if (newFilter) {
      localStorage.setItem("chainFilter", newFilter);
      setFilter(newFilter);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filterOptions = [
    {
      value: 'all',
      label: 'All',
      icon: <CalendarViewMonthIcon />
    },
    {
      value: 'hot',
      label: 'Hot',
      icon: <LocalFireDepartmentIcon sx={{ color: '#FF6E00' }} />
    },
    {
      value: 'new',
      label: 'New',
      icon: <AutoAwesomeIcon sx={{ color: '#1DB954' }} />
    },
    {
      value: 'baseLearn',
      label: 'Base Learn',
      icon: <SquareIcon sx={{ color: '#0000FF' }} />
    },
    {
      value: 'favorites',
      label: 'Favorites',
      icon: <StarIcon sx={{ color: '#FFD700' }} />
    }
  ]
  
  const filteredOptions = useMemo(() => {
    let base = deployOptions;

    if (filter === "hot") {
      base = base.filter((option) => option.tags.includes("hot"));
    } else if (filter === "new") {
      base = base.filter((option) => option.tags.includes("new"));
    } else if (filter === "baseLearn") {
      base = base.filter((option) => option.tags.includes("baseLearn"));
    } else if (filter === "favorites") {
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
  }, [filter, searchValue]);

  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isSmall ? 'column' : 'row',
          gap: 2,
          mb: { xs: 1, sm: 2, md: 3 }
        }}
      >
        <ToggleButtonGroup
          fullWidth
          exclusive
          aria-label="Filter"
          value={filter}
          onChange={handleFilterChange}
          sx={{
            display: 'flex',
            flexWrap: isSmall ? 'wrap' : 'nowrap'
          }}
        >
          {filterOptions.map(({ value, label, icon }) => (
            <ToggleButton
              disableRipple
              key={value}
              value={value}
              sx={{
                gap: 1,
                textTransform: 'none',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                color: '#FFF',
                border: '1px solid rgba(255, 255, 255, 0.3) !important',
                borderRadius: isSmall ? 0 : 2
              }}
            >
              <Typography variant="inherit">{label}</Typography>
              {icon}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <TextField
          fullWidth
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search by name or ID..."
          sx={{ mb: isSmall ? 1 : 0 }}
        />
      </Box>
      <Grid
        container
        rowSpacing={{ xs: 1, sm: 2, md: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {filteredOptions.length === 0
          ? <Box
              sx={{
                width: '100%',
                height: '100%',
                p: 2,
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 2
              }}>
                <Typography>No {filter} chains</Typography>
            </Box>
          : filteredOptions.map((option, index) => (
              <Grid
                key={index}
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
              >
                {option.tags.includes("baseLearn")
                  ? <BaseLearnTile {...option} />
                  : <Tile {...option} />
                }
              </Grid>
            ))
        }
      </Grid>
    </Fragment>
  );
};
