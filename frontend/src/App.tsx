import { JSX, useState } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Header, Content, Sidebar } from "@app-components";
import { sidebarWidthPx } from '@app-utils';
import { lightTheme, darkTheme } from 'theme';

export const App = (): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored ? stored === "dark" : true;
  });

  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("chainFilter") || "all";
  });

  const handleSidebarClose = (): void => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleSidebarTransitionEnd = (): void => {
    setIsClosing(false);
  };

  const handleSidebarToggle = (): void => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleThemeToggle = (): void => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  const updateFilter = (value: string) => {
    localStorage.setItem("chainFilter", value);
    setFilter(value);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Header
          isDarkMode={isDarkMode}
          onToggleSidebar={handleSidebarToggle}
          onToggleTheme={handleThemeToggle}
        />
        <Box
          component="nav"
          sx={{ width: { sm: sidebarWidthPx }, flexShrink: { sm: 0 } }}
        >
          <Sidebar
            variant="temporary"
            open={mobileOpen}
            filterValue={filter}
            onFilterChange={updateFilter}
            onTransitionEnd={handleSidebarTransitionEnd}
            onClose={handleSidebarClose}
          />
          <Sidebar
            variant="permanent"
            open={mobileOpen}
            filterValue={filter}
            onFilterChange={updateFilter}
          />
        </Box>
        <Content filterValue={filter} />
      </Box>
    </ThemeProvider>
  );
}
