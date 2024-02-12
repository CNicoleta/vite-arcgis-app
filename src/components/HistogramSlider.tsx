import { useEffect, useContext, useRef } from "react";

// import Slider from "@mui/material/Slider";

import "./HistogramSlider.css";

import HistogramRangeSlider from "@arcgis/core/widgets/HistogramRangeSlider";
// import HistogramRangeSliderVM from "@arcgis/core/widgets/HistogramRangeSlider/HistogramRangeSliderViewModel.js";
// import Histogram from "@arcgis/core/widgets/Histogram";
// import SliderVM from "@arcgis/core/widgets/Slider/SliderViewModel.js";
// import HistogramVM from "@arcgis/core/widgets/Histogram/HistogramViewModel.js";
import { MapContext } from "@utils/customMapContext";
// import { watch, on } from "@arcgis/core/core/reactiveUtils";
// import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";

const HistogramSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  // const [hm, setHM] = useState<InstanceType<typeof HistogramVM>>();
  // const [sm, setSM] = useState<InstanceType<typeof SliderVM>>();
  // const [sliderValues, setSliderValues] = useState<number>(0);
  // const [layer, setLayer] = useState<__esri.FeatureLayerView>();

  const { view } = useContext(MapContext);

  const slider = new HistogramRangeSlider({
    min: 18,
    max: 80,
    values: [25, 35],
    excludedBarColor: "#524e4e",
    rangeType: "between",
  });

  // useEffect(() => {
  //   if (view) {
  //     setSM(new SliderVM({ min: 18, max: 80 }));
  //   }
  // }, [view]);

  // const handleSlider = (event: Event, newValue: number | number[]) => {
  //   setSliderValues(newValue as number);
  // };

  const getLayerView = async (
    layersCollection: __esri.Collection<__esri.LayerView>
  ) => {
    layersCollection.filter((layer) => {
      console.log("layer", layer);
      return layer === layer;
    });
    // const phoenixFeatureLayerView = view?.whenLayerView(
    //   layersCollection.getItemAt(2).layer
    // );
    // if (!phoenixFeatureLayerView) return;
  };

  //handle phoenix layer effect
  useEffect(() => {
    if (view) {
      //get phoenix featureLayerView (whenLayerView())
      //!featureLayerView
      const layersCollection = view.layerViews;
      if (!layersCollection) return;

      getLayerView(layersCollection);
    }
  }, [view]);

  // useEffect(() => {
  //   let sliderHandle: __esri.WatchHandle;

  //   if (sm) {
  //     sm.on(["segment-drag"], (event) => {
  //       console.log(event);
  //     });
  //   }
  // }, [sm]);

  //   const getHistrogram = async(layer: __esri.FeatureLayer, field: string) => {
  //     const histogramResponse = await new Histogram({
  //         layer: layer,
  //         field: field,
  //         numBins: 80,
  //         minValue: minValue,
  //         maxValue: maxValue
  //     });

  //       slider.bins = histogramResponse.bins;

  //   }
  // const getLayer = (allLayers: __esri.Collection<__esri.LayerView>) => {
  //   const phoenixLayer = allLayers?.getItemAt(2);
  //   if (!phoenixLayer) return;
  //   console.log(phoenixLayer.layer);
  // };

  // useEffect(() => {
  //   if (!view) return;
  //   const allLayers = view?.allLayerViews;
  //   if (!allLayers) return;

  //   getLayer(allLayers);
  // }, [view]);

  useEffect(() => {
    if (view && sliderRef.current) {
      console.log("if histogram");
      slider.container = sliderRef.current;
    }
  }, [sliderRef, view]);

  return (
    <div className="esri-widget" style={{ padding: "10px", width: "100%" }}>
      <div style={{ color: "black" }}>Phoenix Average Age (2015-2020)</div>
      <div style={{ padding: "10px", color: "black" }} className="esri-widget">
        by block groups
      </div>

      {/* <Slider value={sliderValues} onChange={handleSlider} /> */}

      <div style={{ width: "100%", height: "100px" }}>
        <div ref={sliderRef}></div>
      </div>
    </div>
  );
};

export default HistogramSlider;
