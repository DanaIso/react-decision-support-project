import { auth, db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import corgi from "./partsbymalin/corgi.png";
import { Layout } from "antd";

import { useHistory } from "react-router";
import Knapp from "./partsbymalin/Knapp";
import MyLocationFetch from "./MyLocationFetch";
const { Header } = Layout;

function User(params) {
  const history = useHistory();

  function storeSettings(user) {
    const value = JSON.parse(localStorage.getItem("Grid"));
    db.collection("UserGrid")
      .doc(String(user))
      .set({
        ValueData: value,
      })
      .then(() => {
        console.log("Document successfully written!");
        auth.signOut();
        history.push("/");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  //Gör en fetch på location
  <MyLocationFetch />;
  //Hämtar hem information från local storage
  var storage = localStorage.getItem("Location");
  var locationstring = storage.replace('/,/:/"/', " ");
  var locationword = locationstring.split('"');
  if (!locationword[23]) {
    locationword[23] = "Unknown";
  } //locationword[19] = county

  return (
    <Layout>
      <Header
        style={{
          width: "100%",
          backgroundColor: "#FFB96D",
          boxShadow: "0 6px 6px -2px #777",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        <img
          style={{ height: "100%", margin: "1px 0px 0px 0px" }}
          src={corgi}
          alt=""
        />

        <div
          style={{
            width: "30vw",
            margin: "0px 0px 0px 20px",
            color: "white",
            fontSize: "100%",
            fontWeight: "bold",
          }}
        >
          {locationword[23]}, {locationword[11]}
        </div>

        <div
          style={{
            textAlign: "end",
            width: "100%",
            margin: "0px 0px 0px 0px",
          }}
        >
          <Knapp
            color="#FFB96D"
            backgroundcolor="white"
            text="Startsida"
            onClick={() => history.push("/TileView")}
          />
          <Knapp
            color="#FFB96D"
            backgroundcolor="white"
            text="Inställningar"
            onClick={() => history.push("/settings")}
          />
          <Knapp
            color="#FFB96D"
            backgroundcolor="white"
            text="Om oss"
            onClick={() => history.push("/AboutUs")}
          />
          <Knapp
            color="white"
            backgroundcolor="#2874A6"
            text="Logga ut"
            onClick={function () {
              storeSettings(auth.currentUser.uid);
            }}
          />
        </div>
      </Header>
    </Layout>
  );
}

function Guest(params) {
    //Gör en fetch på location
  <MyLocationFetch />;
  //Hämtar hem information från local storage
  var storage = localStorage.getItem("Location");
  var locationstring = storage.replace('/,/:/"/', " ");
  var locationword = locationstring.split('"');
  if (!locationword[23]) {
    locationword[23] = "Unknown";
  } //locationword[19] = county

  const history = useHistory();
  return (
    <Layout>
      <Header
        style={{
          width: "100%",
          backgroundColor: "#FFB96D",
          boxShadow: "0 6px 6px -2px #777",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        <img
          style={{ height: "100%", margin: "1px 0px 0px 0px" }}
          src={corgi}
          alt=""
        />

        <div
          style={{
            width: "30vw",
            margin: "0px 0px 0px 20px",
            color: "white",
            fontSize: "100%",
            fontWeight: "bold",
          }}
        >
          {locationword[23]}, {locationword[11]}
        </div>

        <div
          style={{
            textAlign: "end",
            width: "100%",
            margin: "0px 0px 0px 0px",
          }}
        >

          <Knapp
            color="#FFB96D"
            backgroundcolor="white"
            text="Om oss"
            onClick={() => history.push("/AboutUs")}
          />
          
        </div>
      </Header>
    </Layout>
  );
}

function Navbar(params) {
  //Gör en fetch på location
  <MyLocationFetch />;
  //Hämtar hem information från local storage

  const { currentUser } = useAuth();

  if (currentUser) {
    return <User></User>;
  }
  return <Guest></Guest>;
}

export default Navbar;
