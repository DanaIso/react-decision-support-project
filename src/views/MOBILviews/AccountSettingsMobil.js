import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router";
import Knapp from "../partsbymalin/Knapp";
import { Row, Col } from "antd";
import { Input } from "antd";
import { Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import MyLocationFetch from "../MyLocationFetch";

function AccountSettingsMobil(params) {
  const history = useHistory();
  const { currentUser } = useAuth();

  //Hämtar hem information från local storage
  var storage = localStorage.getItem("Location");
  var locationstring = storage.replace('/,/:/"/', " ");
  var locationword = locationstring.split('"');

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
              fontsize: "10px",
              margin: "0px 0px 0px 10px",
            }}
          >
            {" "}
            {currentUser.email}{" "}
          </p>
          <p
            style={{
              color: "white",
              fontsize: "10px",
              margin: "0px 0px 0px 10px",
            }}
          >
            {" "}
            {locationword[23]}, {locationword[11]}
          </p>
        </Col>
        <Col span={3} offset={1}>
          <Knapp
            color="white"
            backgroundcolor="#FFB96D"
            text="Uppdatera plats"
            onClick={() => <MyLocationFetch />}
          />
        </Col>
      </Row>
      <Divider></Divider>
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

        <Col span={3} offset={1}>
          <div style={{ margin: "25px 0px 0px 0px" }}>
            <Knapp
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

export default AccountSettingsMobil;
