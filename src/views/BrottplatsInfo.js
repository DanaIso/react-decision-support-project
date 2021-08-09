import { useState } from "react";
import { Button, Typography } from "antd";

const BrottplatsInfo = ({ desc, type, location, time, content, image, callback, settings, clockTime, isMobile }) => {
  const [btnState, setBtnState] = useState(false);
  const toggle = () => setBtnState(!btnState);

  const divStyle = {
    borderBottom: "2px solid",
    borderColor: "white",
    padding: "10px",
    margin: "20px",
  };


  const NewDataHour = settings.newDataHour;
  const dateObj = new Date(clockTime);
  const timeDiffMillis = Date.now() - dateObj.getTime();
  const timeDiffHours = timeDiffMillis / 1000 / 60 / 60;
  if (timeDiffHours > NewDataHour) {
    callback(false);
  } else {
    callback(true);
  }

  if (desc === '')
    desc = 'No headline'

  return (
    <>
      {isMobile === 'true' ?
        <div style={divStyle}>
          <Typography.Title level={5} onClick={toggle} className="tileHeader">
            {desc}
          </Typography.Title>
          <p className="tileP">{type}</p>
          <p className="tileP">{location}</p>
          <p className="tileP">{time}</p>
          {btnState && (
            <>
              <div className="tileP" dangerouslySetInnerHTML={{ __html: content }} />
              <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={image} alt="" />
            </>
          )}
        </div>
        :
        <div style={divStyle}>
          <Typography.Title level={5} onClick={toggle} className="tileHeader">
            {desc}
          </Typography.Title>
          <p className="tileP">{type}</p>
          <p className="tileP">{location}</p>
          <p className="tileP">{time}</p>
          {btnState ? (
            <Button type="link" onClick={toggle}>
              Mindre information
            </Button>
          ) : (
            <Button type="link" onClick={toggle}>
              Mer information
            </Button>
          )}
          {btnState && (
            <>
              <div className="tileP" dangerouslySetInnerHTML={{ __html: content }} />
              <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={image} alt="" />
            </>
          )}
        </div>
      }
    </>
  );
};

export default BrottplatsInfo;
