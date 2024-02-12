//*app imports
import "./App.css";
import FloodsMapComponent from "./components/FloodsMapComponent";
import PhoenixMapComponent from "./components/PhoenixMapComponent";
import VolcanoesMapComponent from "./components/VolcanoesMapComponent";
import CountryHighlightMap from "./components/CountryHighlightMap";
import MapControlsButtons from "./components/MapControlsButtons";
import MuiButton from "./components/MuiButton";
import HomePage from "./pages/HomePage";

//*react imports
import { useState } from "react";

//*mui imports
import Box from "@mui/material/Box";

//*react-router imports
import { Routes, Route, useLocation } from "react-router";
import { NavLink } from "react-router-dom";

// const maps = [
//   {
//     id: "0",
//     title: "Missing Migrants",
//     mapId: "ad5759bf407c4554b748356ebe1886e5",
//   },
//   {
//     id: "1",
//     title: "Refugee Routes",
//     mapId: "71ba2a96c368452bb73d54eadbd59faa",
//   },
//   {
//     id: "2",
//     title: "2015 European Sea Arrivals",
//     mapId: "45ded9b3e0e145139cc433b503a8f5ab",
//   },
// ];

const buttons = [
  {
    id: "0",
    title: "Winter",
  },
  {
    id: "1",
    title: "Spring",
  },
  {
    id: "2",
    title: "Summer",
  },
  {
    id: "3",
    title: "Fall",
  },
];

const navLinks = [
  {
    id: "0",
    title: "Phoenix Map",
    path: "/phoenixMap",
  },
  {
    id: "1",
    title: "Floods Map",
    path: "/floodsMap",
  },
  {
    id: "2",
    title: "Volcanoes Map",
    path: "/volcanoesMap",
  },
  {
    id: "3",
    title: "World Countries Map",
    path: "/countriesMap",
  },
];

const App = () => {
  const [season, setSeason] = useState<string>("");
  const { pathname } = useLocation();

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
        {pathname === "/floodsMap" &&
          buttons.map((button) => (
            <MuiButton key={button.id} onClick={() => setSeason(button.title)}>
              {button.title}
            </MuiButton>
          ))}

        {navLinks.map((navEl) => (
          <NavLink key={navEl.id} to={navEl.path}>
            {navEl.title}
          </NavLink>
        ))}
      </Box>

      <Box
        gridColumn="span 12"
        display="grid"
        flexDirection="row"
        gridTemplateColumns="0.1fr 2fr"
        gap={0.5}
      >
        <Box>
          <MapControlsButtons />
        </Box>

        <Box>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/floodsMap"
              element={<FloodsMapComponent season={season} />}
            />

            <Route path="/phoenixMap" element={<PhoenixMapComponent />} />

            <Route path="/volcanoesMap" element={<VolcanoesMapComponent />} />

            <Route path="/countriesMap" element={<CountryHighlightMap />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
