import { JSX, useState } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { Header, Content, Sidebar } from "@app-components";
import { sidebarWidthPx } from '@app-utils';
import { lightTheme, darkTheme } from 'theme';


export const App = (): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

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
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Header
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
            onTransitionEnd={handleSidebarTransitionEnd}
            onClose={handleSidebarClose}
          />
          <Sidebar
            variant="permanent"
            open={mobileOpen}
          />
        </Box>
        <Content />
      </Box>
    </ThemeProvider>
  );
}
