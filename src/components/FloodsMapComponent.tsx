import { useCallback, useContext, useEffect, useRef } from "react";

import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";

import { MapContext } from "@utils/customMapContext";
import MapLayout from "@layouts/MapLayout";

const FloodsMapComponent = ({ season }: { season: string }) => {
  const { view } = useContext(MapContext);

  const floodLayer = useRef<FeatureLayer>(
    new FeatureLayer({
      portalItem: {
        id: "f9e348953b3848ec8b69964d5bceae02",
      },
      outFields: ["SEASON"],
    })
  );

  const mapProperties = {
    // portalItem: {
    // id: "ad5759bf407c4554b748356ebe1886e5",
    //   id: "71ba2a96c368452bb73d54eadbd59faa",
    // id: "45ded9b3e0e145139cc433b503a8f5ab",
    // },
    basemap: "gray-vector",
    layers: [floodLayer.current],
  };

  const viewProperties = {
    center: [-98, 40],
    zoom: 4,
  };

  const handleFilters = useCallback(async () => {
    try {
      // console.log(view);
      if (view) {
        const floodLayerView = await view.whenLayerView(floodLayer.current);

        if (season !== "" && floodLayerView) {
          const expression = `Season = '${season}'`;
          floodLayerView.filter = new FeatureFilter({
            where: expression,
          });
        }
      }
    } catch (e) {
      console.log("Floods map error", e);
    }
  }, [view, season]);

  useEffect(() => {
    if (!view) return;

    handleFilters();
  }, [view, season]);

  return (
    <MapLayout mapProperties={mapProperties} viewProperties={viewProperties} />
  );
};

export default FloodsMapComponent;
