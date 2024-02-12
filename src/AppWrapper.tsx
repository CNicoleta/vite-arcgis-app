import App from "./App";
import { MapProvider } from "@utils/customMapContext";

import { BrowserRouter } from "react-router-dom";

const AppWrapper = () => {
  return (
    //TODO: foloseste createBrowserRouter + RouterProvider
    <BrowserRouter>
      <MapProvider>
        <App />
      </MapProvider>
    </BrowserRouter>
  );
};

export default AppWrapper;
