import { useEffect, useContext, useRef } from "react";

import { MapContext } from "@utils/customMapContext";
import MapLayout from "@layouts/MapLayout";
import HistogramSlider from "./HistogramSlider";

const PhoenixMapComponent = () => {
  const histogramRef = useRef<HTMLDivElement>(null);
  const { view } = useContext(MapContext);

  const mapProperties = {
    portalItem: {
      id: "f3551252973c41fa868c08edceb504e6",
    },
  };
  const viewProperties = {};

  // useEffect(() => {
  //   if (mapRef.current && loadMap) {
  //     loadMap(mapProperties, viewProperties, mapRef.current);
  //   }
  // }, [mapRef, loadMap]);

  useEffect(() => {
    if (view && histogramRef.current) {
      view.ui.add(histogramRef.current, 'bottom-left');
    }

    return () => {
      view?.ui.remove(histogramRef.current as HTMLElement)
    }
  }, [view, histogramRef]);

  // return <div style={{ height: "100%", width: "100%" }} ref={mapRef}></div>;
  return (
    <>
      <div style={{ width: "100%" }} ref={histogramRef}>
        <HistogramSlider/>
      </div>
      <MapLayout
        mapProperties={mapProperties}
        viewProperties={viewProperties}
      />
    </>
  );
};

export default PhoenixMapComponent;
