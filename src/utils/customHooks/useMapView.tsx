// import MapView from "@arcgis/core/views/MapView";
// import WebMap from "@arcgis/core/WebMap";

// import { useRef, useState, useEffect } from "react";

// //create a function that creates a view
// const createMapView = (
//   mapProperties: __esri.WebMapProperties,
//   viewProperties: __esri.MapViewProperties
// ) => {
//   const map = new WebMap({ ...mapProperties });
//   const view = new MapView({
//     map,
//     ...viewProperties,
//   });

//   return view;
// };

// //create a function that destroys the view
// const destroyMapView = (view: MapView) => {
//   if (!view) return;

//   view.container = null as unknown as HTMLDivElement;
// };

// //create a custom hook that initiates the view
// export const useMapView = (
//   mapProperties: __esri.WebMapProperties,
//   viewProperties: __esri.MapViewProperties
// ) => {
//   const mapRef = useRef(null);
//   const propsOptions = useRef({ mapProperties, viewProperties });

//   const [view, setView] = useState<MapView>();


//   useEffect(() => {

//   },[view])
// };
