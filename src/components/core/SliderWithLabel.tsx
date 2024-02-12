import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

const SliderWithLabel = ({
  title,
  sliderName,
  sliderValue,
  sliderMarks,
  onSliderChange,
  sliderStep,
  sliderMinVal,
  sliderMaxVal,
}: {
  title: string;
  sliderName: string;
  sliderValue: number | number[];
  sliderMarks: boolean | { value: number; label: string }[] | undefined;
  onSliderChange: (event:any) => void;
  sliderStep: number;
  sliderMinVal: number;
  sliderMaxVal: number;
}) => {
  return (
    <>
      <Typography>{title}</Typography>
      <Slider
        name={sliderName}
        value={sliderValue}
        onChange={onSliderChange}
        style={{ marginRight: "15px", marginLeft: "5px" }}
        step={sliderStep}
        min={sliderMinVal}
        max={sliderMaxVal}
        aria-label="Always visible"
        valueLabelDisplay="auto"
        marks={sliderMarks}
      />
    </>
  );
};

export default SliderWithLabel;
