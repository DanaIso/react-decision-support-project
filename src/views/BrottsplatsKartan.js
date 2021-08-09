import { useState, useEffect } from "react";
import BrottplatsInfo from "./BrottplatsInfo";
import axios from "axios";
import StandardSubSettings from "./SettingsComponents/StandardSubSettings";
import LocationCheck from "./SettingsComponents/LocationCheck";
import { Typography } from "antd";

const BrottsplatsKartan = ({
  isMobile,
  tileColor,
  apiAdd,
  settings,
  setHaveNewData,
}) => {
  const [alertData, setAlertData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [initial, setInitial] = useState(true);

  let localSettings = StandardSubSettings(settings, "BrottsplatsKartan");
  let area = LocationCheck("BrottsplatsKartan", null, localSettings.useArea);
  let crimeType = "";

  const getAPI = async () => {
    const apiFromServer = await axios(
      `https://brottsplatskartan.se/api/events/?area=${area}&type=${crimeType}`
    );

    console.log(apiFromServer.data);
    console.log(apiFromServer.data.data[0].pubdate_iso8601);
    setAlertData(apiFromServer.data);
  };

  useEffect(() => {
    getAPI();
    const interval = setInterval(getAPI, 65000);
    return () => clearInterval(interval);
  }, []);

  let valueArray = [];

  function BPHaveNewDataCallback(value) {
    valueArray.push(value);

    if (valueArray.includes(true)) {
      setHaveNewData(true);
    } else {
      setHaveNewData(false);
    }
  }

  const sendInfo = () => {
    if (alertData.data) setInitial(false);

    if (alertData.data) {
      alertData.data.forEach((value, index) => {
        const dateFormated = value.pubdate_iso8601
          .replace("latest_update ", "")
          .replaceAll("-", "")
          .replaceAll("T", "")
          .replaceAll(":", "")
          .replace("+", "");
        //console.log(dateFormated)
        setFinalData((finalData) => [
          ...finalData,
          {
            idArray: 1,
            desc: value.description,
            type: value.title_type,
            location: value.title_location,
            time: value.date_human,
            content: value.content,
            image: value.image,
            date: dateFormated,
            callback: BPHaveNewDataCallback,
            settings: { settings },
          },
        ]);
      });
    }
  };

  useEffect(() => {
    if (isMobile === "true") apiAdd(finalData);
  }, [finalData]);

  useEffect(() => {
    if (initial && isMobile === "true") sendInfo();
  }, [alertData]);

  var apiData =
    alertData.data &&
    alertData.data.map((value, index) => {
      return (
        <>
          {isMobile === "true" ? (
            <></>
          ) : (
            <BrottplatsInfo
              key={index}
              desc={value.description}
              type={value.title_type}
              location={value.title_location}
              time={value.date_human}
              content={value.content}
              image={value.image}
              callback={BPHaveNewDataCallback}
              settings={settings}
              clockTime={value.pubdate_iso8601}
            />
          )}
        </>
      );
    });

  // is empty even a possibility?
  var empty = alertData.length === 0;

  return (
    <>
      {empty ? (
        <>
          {isMobile === "true" ? (
            <></>
          ) : (
            <>
              <Typography.Title level={5} className="tileHeader">
                Inga varningar just nu
              </Typography.Title>
            </>
          )}
        </>
      ) : (
        <>{apiData}</>
      )}
    </>
  );
};

export default BrottsplatsKartan;
