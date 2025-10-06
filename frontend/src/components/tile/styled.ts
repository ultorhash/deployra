import styled from "@emotion/styled";
import { Tabs } from "@mui/material";

export const StyledTabs = styled(Tabs)({
  height: 40,
  minHeight: 40,

  '& .MuiTabs-indicator': {
    display: 'none',
  },
  '& .MuiTab-root': {
    minHeight: 40,
    paddingTop: 0,
    paddingBottom: 0,
  }
});
