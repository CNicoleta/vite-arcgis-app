import { useRef, useContext, useEffect, useState, useCallback } from "react";

//*app imports
import MapLayout from "@layouts/MapLayout";
import {
  bloomMarks,
  blurMarks,
  brightnessMarks,
} from "@utils/slider/effectMarks";
import { MapContext } from "@utils/customMapContext";
import SliderWithLabel from "@core/SliderWithLabel";
import { slidersArray } from "@utils/slider/sliders";
import "@styles/slidersStyles.css";

//*arcgis imports
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect";

const worldVolcanoesURL =
  "https://services.arcgis.com/BG6nSlhZSAWtExvp/arcgis/rest/services/World_Volcanoes/FeatureServer";

const initialSlidersState = {
  bloomSlider: 0,
  blurSlider: 0,
  brightnessSlider: 0,
};

const VolcanoesMapComponent = () => {
  const { view } = useContext(MapContext);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [slidersValues, setSlidersValues] = useState(initialSlidersState);

  const worldVolcanoesFeatureLayer = useRef<FeatureLayer>(
    new FeatureLayer({
      url: worldVolcanoesURL,
      id: "2a45f767a6e549bfbe5bf638681f1fac",
    })
  );

  useEffect(() => {
    if (view && sliderRef.current) {
      view.ui.add(sliderRef.current, "bottom-left");
    }
  }, [view, sliderRef]);

  const handleSliderChangeEvent = (event: any) => {
    const e = event.target;
    if (e) {
      const { value, name } = e;

      setSlidersValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleEffect = useCallback(async () => {
    try {
      if (!view) return;

      const layerView = await view.whenLayerView(
        worldVolcanoesFeatureLayer.current
      );
      if (slidersValues) {
        const effect = `bloom(${slidersValues.bloomSlider}%, 3px, 0.2) drop-shadow(${slidersValues.blurSlider}px, ${slidersValues.blurSlider}px, ${slidersValues.blurSlider}px, black) saturate(${slidersValues.blurSlider}) brightness(${slidersValues.brightnessSlider})`;
        layerView.featureEffect = new FeatureEffect({
          includedEffect: effect,
        });
      }
    } catch (e) {
      console.log("volcanoes error", e);
    }
  }, [view, slidersValues]);

  useEffect(() => {
    if (view) {
      handleEffect();
    }
  }, [view, slidersValues]);

  return (
    <>
      <div ref={sliderRef} className="slider-container">
        {slidersArray.map((slider) => {
          const marks =
            slider.name === "bloomSlider"
              ? bloomMarks
              : slider.name === "blurSlider"
              ? blurMarks
              : brightnessMarks;

          return (
            <SliderWithLabel
              key={slider.name}
              title={slider.title}
              sliderName={slider.name}
              sliderValue={
                slidersValues[slider.name as keyof typeof slidersValues]
              }
              sliderMarks={marks}
              sliderStep={slider.step}
              sliderMinVal={slider.min}
              sliderMaxVal={slider.max}
              onSliderChange={handleSliderChangeEvent}
            />
          );
        })}
      </div>

      <MapLayout
        mapProperties={{
          layers: [worldVolcanoesFeatureLayer.current],
        }}
        viewProperties={{}}
      />
    </>
  );
};

export default VolcanoesMapComponent;
