import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";

interface MapApp {
  view?: MapView;
}

const mapApp: MapApp = {};

export const initMap = async (container: HTMLDivElement) => {
  if (mapApp.view) {
    mapApp.view.destroy();
  }

  const layer = new FeatureLayer({
    portalItem: {
      id: "74c2741fa7fd4a92b33a1f241c2dbaa1",
    },
  });

  const map = new Map({
    basemap: "dark-gray-vector",
    layers: [layer],
  });

  const view = new MapView({
    map,
    container: container,
  });

  await reactiveUtils.whenOnce(() => (view.extent = layer.fullExtent));

  return view;
};
