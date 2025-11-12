import { JSX, useState } from 'react';
import { Box } from '@mui/material';
import { Header, Main, Sidebar } from "@app-components";
import { sidebarWidthPx } from '@app-utils';

export const App = (): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Header onToggleSidebar={handleSidebarToggle} />
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
      <Main />
    </Box>
  );
}
