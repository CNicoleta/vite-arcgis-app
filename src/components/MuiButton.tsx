import Button, { ButtonProps } from "@mui/material/Button";

const MuiButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button variant="contained" {...props}>
      {children}
    </Button>
  );
};

export default MuiButton;
