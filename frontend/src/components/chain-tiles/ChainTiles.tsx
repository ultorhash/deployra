import { Fragment, useMemo, useState } from "react";
import { Box, Grid, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import { Tile } from "@app-components";
import { DeployOption } from "@app-types";
import { deployOptions } from "./data";
import useMediaQuery from '@mui/material/useMediaQuery';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StarIcon from '@mui/icons-material/Star';

export const ChainTiles = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

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
      value: 'favorites',
      label: 'Favorites',
      icon: <StarIcon sx={{ color: '#FFD700' }} />
    }
  ]
  
  const filteredOptions = useMemo(() => {
    if (filter === "all") return deployOptions;

    if (filter === "hot") {

      return deployOptions.filter((option) => option.tags.includes("hot"));
    }

    if (filter === "new") {
      return deployOptions.filter((option) => option.tags.includes("new"));
    }

    if (filter === "favorites") {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      return deployOptions.filter((option) => favorites[option.chainId]);
    }

    return deployOptions;
  }, [filter]);

  return (
    <Fragment>
      <ToggleButtonGroup
        fullWidth
        exclusive
        aria-label="Filter"
        value={filter}
        onChange={handleFilterChange}
        sx={{
          mb: 2,
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
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <Typography variant="inherit">{label}</Typography>
            {icon}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
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
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                <Typography>No {filter} chains</Typography>
            </Box>
          : filteredOptions.map((option, index) => (
              <Grid
                key={index}
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
              >
                <Tile {...option} />
              </Grid>
            ))
        }
      </Grid>
    </Fragment>
  );
};
