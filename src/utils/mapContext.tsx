import { useState, createContext, ReactNode } from "react";
import type MapView from "@arcgis/core/views/MapView";

type MapContextProps = {
  view?: MapView;
  loadMap?: (container: HTMLDivElement) => Promise<void>;
};

const MapContext = createContext<MapContextProps>({});

const MapProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<MapView>();

  const loadMap = async (container: HTMLDivElement) => {
    if (view) return;

    const { initMap } = await import("./mapDefinition");
    const loadedView = await initMap(container);
    if (!loadedView) return;
    setView(loadedView);
  };

  return (
    <MapContext.Provider value={{ view, loadMap }}>
      {children}
    </MapContext.Provider>
  );
};

export { MapContext, MapProvider };
