import WebMap from "@arcgis/core/WebMap";
// import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { whenOnce } from "@arcgis/core/core/reactiveUtils";
// import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

interface MapApp {
  view?: MapView;
}

const mapApp: MapApp = {};

export const initCustomMap = async (
  customMapProperties: __esri.WebMapProperties,
  customViewProperties: __esri.MapViewProperties,
  container: HTMLDivElement
) => {
  if (mapApp.view) {
    // console.log("map destroyed");
    mapApp.view.destroy();
  }

  // if (portalId && outFields) {
  //   const layer = new FeatureLayer({
  //     portalItem: {
  //       id: portalId,
  //     },
  //     outFields,
  //   });

  //   const map = new Map({
  //     layers: [layer],
  //   });

  //   const view = new MapView({
  //     map,
  //     container,
  //     ...customViewProperties,
  //   });

  //   const isViewReady = await whenOnce(() => view.ready);
  //   const isLayerReady = await whenOnce(() => layer.load());

  //   if (!isViewReady || !isLayerReady) return;

  //   return view;
  // }

  const map = new WebMap({
    ...customMapProperties,
  });

  const view = new MapView({
    map,
    container,
    ...customViewProperties,
  });

  const isViewReady = await whenOnce(() => view.ready);

  if (!isViewReady) return;

  return view;
};
