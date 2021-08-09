import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router";
import Knapp from "./partsbymalin/Knapp";
import { Row, Col } from "antd";
import { Input } from "antd";
import { Divider } from "antd";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons";
import MyLocationFetch from "./MyLocationFetch";
import { useState } from "react";
function AccountSettings(params) {
  const history = useHistory();
  const { currentUser } = useAuth();

  //Hämtar hem information från local storage
  var storage = localStorage.getItem("Location");
  var locationstring = storage.replace('/,/:/"/', " ");
  var locationword = locationstring.split('"');
  if (!locationword[23]) {
    locationword[23] = "Unknown";
  }

  const [isLoading, setIsloading] = useState(false);

  return (
    <div className="ant-col-24">
      <Row>
        <h1
          style={{
            color: "black",
            fontSize: "30px",
            margin: "50px 0px 0px 70px",
          }}
        >
          Kontoinställningar
        </h1>
      </Row>
      <Divider></Divider>

      <Row>
        <Col span={10} offset={2}>
          <p
            style={{
              color: "white",
              fontsize: "20px",
              margin: "0px 0px 0px 10px",
            }}
          >
            {" "}
            {currentUser.email}{" "}
          </p>
          <p
            style={{
              color: "white",
              fontsize: "20px",
              margin: "0px 0px 0px 10px",
            }}
          >
            {" "}
            {locationword[23]}, {locationword[11]}
          </p>
        </Col>
        <Col span={8} offset={1}>
          <Knapp
            color="white"
            width="10vw"
            backgroundcolor="#FFB96D"
            text={
              isLoading === true ? (
                <LoadingOutlined style={{ fontSize: 24 }} spin />
              ) : (
                "Uppdatera platsinfo"
              )
            }
            onClick={() => {
              setIsloading(true);
              setTimeout(() => {
                MyLocationFetch();
                setIsloading(false);
              }, 1000);
            }}
          />
        </Col>
      </Row>

      <Row>
        <Divider></Divider>
      </Row>

      <Row>
        <Col span={10} offset={2}>
          <h1
            style={{
              color: "black",
              fontSize: "20px",
              margin: "0px 0px 0px 10px",
            }}
          >
            Återställ lösenord
          </h1>
          <div style={{ margin: "0px 0px 0px 5px" }}>
            <Input
              size="large"
              placeholder="Skriv in email"
              prefix={<UserOutlined />}
              style={{ width: "80%" }}
            />
          </div>
        </Col>

        <Col span={8} offset={1}>
          <div style={{ margin: "25px 0px 0px 0px" }}>
            <Knapp
              width="10vw"
              color="white"
              backgroundcolor="#FFB96D"
              text="Återställ lösenord"
              onClick={() => history.push("/FrontPage")}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AccountSettings;
