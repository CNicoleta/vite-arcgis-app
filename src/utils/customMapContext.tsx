import { ReactNode, createContext, useState } from "react";
import type MapView from "@arcgis/core/views/MapView";
// import { Subject } from "rxjs/internal/Subject";

type MapContextProps = {
  view?: MapView;
  loadMap?: (
    customMapProperties: __esri.WebMapProperties,
    customViewProperties: __esri.MapViewProperties,
    container: HTMLDivElement
  ) => Promise<void>;
};

const MapContext = createContext<MapContextProps>({});
// const mapSubject = new Subject();
// const initialState = {
//   mapProps: {},
//   viewProps: {},
// };

// const useDynamicMapId = (
//   portalId: string,
//   customMapProperties: __esri.WebMapProperties,
//   customViewProperties: __esri.MapViewProperties,
//   container: HTMLDivElement
// ) => {
//   const handleDynamicId = useCallback(async () => {
//     const { initCustomMap } = await import("./customMapDefinition");
//     const loadedMapView = await initCustomMap(
//       portalId,
//       customMapProperties,
//       customViewProperties,
//       container
//     );
//     return loadedMapView;
//   }, [portalId, customMapProperties, customViewProperties, container]);

//   return { handleDynamicId };
// };

const MapProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<MapView>();

  // const mapStore = {
  //   subscribe: (setView: any) => mapSubject.subscribe(setView),
  //   init: () => mapSubject.next(view),
  //   updateMapProps: (mapProps: __esri.WebMapProperties) =>
  //     mapSubject.next(mapProps),
  //   updateViewProps: (viewProps: __esri.MapViewProperties) =>
  //     mapSubject.next(viewProps),
  // };

  const loadMap = async (
    customMapProperties: __esri.WebMapProperties,
    customViewProperties: __esri.MapViewProperties,
    container: HTMLDivElement
  ) => {
    if (view) {
      // setView(view);
      console.log("if view");
      return;
    }

    const { initCustomMap } = await import("./customMapDefinition");
    // console.log({ customMapProperties, customViewProperties });
    const loadedMapView = await initCustomMap(
      customMapProperties,
      customViewProperties,
      container
    );

    if (!loadedMapView) return;
    setView(loadedMapView);
  };

  return (
    <MapContext.Provider value={{ view, loadMap }}>
      {children}
    </MapContext.Provider>
  );
};

export { MapContext, MapProvider };
