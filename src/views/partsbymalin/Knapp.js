import { Button } from "antd";

const Knapp = ({ color, backgroundcolor, text, onClick, width }) => {
  return (
    <Button
      onClick={onClick}
      shape="round"
      style={{
        background: backgroundcolor,
        outline: "none",
        border: "none",
        color: color,
        margin: "0.5%",
        width: width,
      }}
      className="btn"
    >
      {text}
    </Button>
  );
};
export default Knapp;
