import { useContext, useEffect } from "react";

import { MapContext } from "@/utils/customMapContext";
import MapLayout from "@/layouts/MapLayout";
import {
  addGraphics,
  removeAllGraphics,
} from "@/utils/graphics/handleGraphics";

import TileLayer from "@arcgis/core/layers/TileLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { on } from "@arcgis/core/core/reactiveUtils";

const countries = new FeatureLayer({
  portalItem: {
    id: "53a1e68de7e4499cad77c80daba46a94",
  },
  popupEnabled: false,
});

const worldImagery = new TileLayer({
  portalItem: {
    id: "10df2279f9684e4a9f6a7f08febac2a9",
  },
});

const tileLayer = new TileLayer({
  portalItem: {
    id: "10df2279f9684e4a9f6a7f08febac2a9",
  },
});

const graphicsLayer = new GraphicsLayer({
  title: "layers",
  blendMode: "destination-in",
});

const groupLayer = new GroupLayer({
  layers: [tileLayer, graphicsLayer],
  opacity: 0,
});

const CountryHighlightMap = () => {
  const { view } = useContext(MapContext);

  const mapProps = {
    layers: [worldImagery, groupLayer, countries],
  };
  const viewProps = {
    zoom: 6,
    center: [2, 46],
    constraints: {
      snapToZoom: false,
      minScale: 147914381,
    },
  };

  const handleCountryHighlight = async (
    query: __esri.Query | __esri.QueryProperties | undefined,
    zoomGeometry: __esri.Geometry
  ) => {
    try {
      const queryResult = await countries?.queryFeatures(query);
      if (!queryResult) return;

      const { features } = queryResult;

      if (features.length > 0) {
        const symbol = {
          type: "simple-fill",
          color: "rgba(255, 255, 255, 1)",
          outline: null,
        } as unknown as __esri.Symbol;

        features[0].symbol = symbol;
        addGraphics(graphicsLayer, features);

        view?.goTo(zoomGeometry, {
          easing: "ease-in",
          duration: 500,
        });

        worldImagery.effect = "blur(8px) brightness(1.2) grayscale(0.8)";
        groupLayer.effect = "brightness(1.5) drop-shadow(0, 0px, 12px)";
        groupLayer.opacity = 1;
      } else {
        worldImagery.effect = null as unknown as __esri.Effect;
        groupLayer.effect = null as unknown as __esri.Effect;
      }
    } catch (error) {
      console.log("Error in highlight country", error);
    }
  };

  const disablePopup = () => {
    tileLayer.when(() => {
      tileLayer.allSublayers.forEach((layer) => {
        layer.popupEnabled = false;
      });
    });

    worldImagery.when(() => {
      worldImagery.allSublayers.forEach((layer) => {
        layer.popupEnabled = false;
      });
    });
  };

  useEffect(() => {
    let viewWatchHandle: __esri.WatchHandle;
    disablePopup();

    if (view) {
      viewWatchHandle = on(
        () => view,
        "click",
        (event) => {
          if (!event) return;
          removeAllGraphics(graphicsLayer);

          const query = {
            geometry: view.toMap(event),
            returnGeometry: true,
            outFields: ["*"],
          };

          handleCountryHighlight(query, query.geometry);
        }
      );
    }

    return () => viewWatchHandle?.remove();
  }, [view]);

  return <MapLayout mapProperties={mapProps} viewProperties={viewProps} />;
};

export default CountryHighlightMap;
