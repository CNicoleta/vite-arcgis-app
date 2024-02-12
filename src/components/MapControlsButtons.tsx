import IconButton from "@mui/material/IconButton";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";

import ZoomVM from "@arcgis/core/widgets/Zoom/ZoomViewModel";
import HomeVM from "@arcgis/core/widgets/Home/HomeViewModel";
import CompassVM from "@arcgis/core/widgets/Compass/CompassViewModel";

import { useState, useEffect, useContext } from "react";

import { MapContext } from "@utils/customMapContext";
import { watch } from "@arcgis/core/core/reactiveUtils";

// const widgetButtons = [
//   {
//     id: "zoomIn",
//     icon: <ZoomInIcon fontSize="large" />,
//     onClick: () => {},
//   },
//   {
//     id: "zoomOut",
//     icon: <ZoomOutIcon fontSize="large" />,
//   },
//   {
//     id: "compass",
//     icon: <ExploreIcon fontSize="large" />,
//   },
// ];
/* {widgetButtons.map((widgetButton) => (
        <IconButton key={widgetButton.id} color="primary">
          {widgetButton.icon}
        </IconButton>
      ))} */

const MapControlsButtons = () => {
  const { view } = useContext(MapContext);
  //TODO: de facut un singur state
  const [hm, setHM] = useState<InstanceType<typeof HomeVM>>();
  const [vm, setVM] = useState<InstanceType<typeof ZoomVM>>();
  const [cm, setCM] = useState<InstanceType<typeof CompassVM>>();
  const [disableZoomIn, setDisableZoomIn] = useState<boolean>(false);
  const [disableZoomOut, setDisableZoomOut] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);

  useEffect(() => {
    if (view) {
      setVM(new ZoomVM({ view }));
      setCM(new CompassVM({ view }));
    }
  }, [view]);

  useEffect(() => {
    let zoomHandle: __esri.WatchHandle;

    if (vm) {
      setHM(new HomeVM({ view }));

      zoomHandle = watch(
        () => [!vm.canZoomIn, !vm.canZoomOut],
        ([zoomIn, zoomOut]) => {
          setDisableZoomIn(zoomIn);
          setDisableZoomOut(zoomOut);
        }
      );
    }

    return () => zoomHandle?.remove();
  }, [vm]);

  useEffect(() => {
    let compasHandle: __esri.WatchHandle;

    if (cm) {
    
      compasHandle = watch(
        () => cm.orientation,
        () => {
          setRotation(cm.orientation.z);
        }
      );
    }

    return () => compasHandle?.remove();
  }, [cm]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* //TODO: foloseste map sa randezi butoanele */}
      <IconButton
        id="zoom-in"
        onClick={() => vm?.zoomIn()}
        disabled={disableZoomIn}
        color="primary"
      >
        <ZoomInIcon fontSize="large" />
      </IconButton>

      <IconButton
        id="zoom-out"
        onClick={() => vm?.zoomOut()}
        disabled={disableZoomOut}
        color="primary"
      >
        <ZoomOutIcon fontSize="large" />
      </IconButton>

      <IconButton id="zoom-initial" onClick={() => hm?.go()} color="primary">
        <HomeIcon fontSize="large" />
      </IconButton>

      <IconButton id="compas" color="primary" onClick={() => cm?.reset()}>
        <ExploreIcon
          fontSize="large"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </IconButton>
    </div>
  );
};

export default MapControlsButtons;
