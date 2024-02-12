import { ReactNode } from "react";

import Box from "@mui/material/Box";
import MuiIconButtons from "../components/MapControlsButtons";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box display="grid" gap={0.5} height="100%" gridTemplateRows="0.15fr 2fr">
      <Box
        gridColumn="span 12"
        display="flex"
        gap="5px"
        padding="5px"
        alignItems="center"
        justifyContent="center"
      >
       //*header
      </Box>

      <Box
        gridColumn="span 12"
        display="grid"
        flexDirection="row"
        gridTemplateColumns="0.1fr 2fr"
        gap={0.5}
      >
        <Box>
          <MuiIconButtons />
        </Box>

        <Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default PageLayout;
