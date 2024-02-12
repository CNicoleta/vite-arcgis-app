import { useRef, useContext, useEffect } from "react";

import { MapContext } from "../utils/customMapContext";

// import { of, map } from "rxjs";

const MapLayout = ({
  mapProperties,
  viewProperties,
}: {
  mapProperties: __esri.WebMapProperties;
  viewProperties: __esri.MapViewProperties;
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { loadMap } = useContext(MapContext);
  // const [viewRef, setViewRef] = useState(mapRef.current);
  // const initialState = {
  //   mapProperties,
  //   viewProperties,
  // };
  // const [initialProps, setInitialProps] = useState(initialState);

  // const map = useCallback(() => {
  //   if (mapRef.current && loadMap)
  //     loadMap(mapProperties, viewProperties, mapRef.current);
  // }, [mapRef, loadMap, mapProperties, viewProperties]);

  // useEffect(() => {
  //   if (mapRef.current) {
  //     setInitialProps((prevState) =>
  //       prevState != initialProps ? prevState : initialProps
  //     );
  //   }
  // }, [mapRef]);

  useEffect(() => {
    if (mapRef.current && loadMap) {
      // console.log(of(1, 2, 3).pipe(map((x) => x + "!!!")));
      //de observat mapProperties si view
      // loadMap(
      //   initialProps.mapProperties,
      //   initialProps.viewProperties,
      //   mapRef.current
      // );
      loadMap(mapProperties, viewProperties, mapRef.current);
    }
    // map();
  }, [mapRef, loadMap]);

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }}></div>;
};

export default MapLayout;
