import { useContext, useRef, useEffect } from "react";
import { MapContext } from "@utils/customMapContext";

const SwapMapsComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { loadMap } = useContext(MapContext);

  const mapProperties = {};
  const viewProperties = {};

  useEffect(() => {
    if (mapRef.current && loadMap) {
      loadMap(mapProperties, viewProperties, mapRef.current);
    }
  }, [mapRef.current, loadMap]);

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }}></div>;
};

export default SwapMapsComponent;
