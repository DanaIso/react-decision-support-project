import { auth, db } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { Select } from "antd";
import corgi from "../partsbymalin/corgi.png";
import { Layout } from "antd";

import { useHistory } from "react-router";
import MyLocationFetch from "../MyLocationFetch";
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
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  const handleChange = (value) => {
    console.log(value);
    if (value === 0) {
      history.push("/TileView");
    } else if (value === 1) {
      history.push("/AboutUS");
    } else if (value === 2) {
      history.push("/settings");
    } else if (value === 3) {
      storeSettings(auth.currentUser.uid);
      history.push("/login");
    }
  };

  return (
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
        style={{ height: "100%", margin: "0px 0px 0px -40px" }}
        src={corgi}
        alt=""
      />

      <Select
        className="MenySelect"
        defaultValue={0}
        style={{
          height: "50%",
          width: "100%",
          color: "#FFB96D",
          fontWeight: "bold",
          margin: "15px 0px 0px 20px",
        }}
        onChange={handleChange}
      >
        <option
          style={{ backgroundColor: "#FFB96D", color: "white" }}
          value={0}
        >
          Startsida
        </option>
        <option
          style={{ backgroundColor: "#FFB96D", color: "white" }}
          value={1}
        >
          Om oss
        </option>
        <option
          style={{ backgroundColor: "#FFB96D", color: "white" }}
          value={2}
        >
          Inställningar
        </option>
        <option
          style={{ backgroundColor: "#FFB96D", color: "white" }}
          value={3}
        >
          Logga ut
        </option>
      </Select>
    </Header>
  );
}

function Guest(params) {
  return (
    <Layout>
      <Header
        style={{ backgroundColor: "#FFB96D", boxShadow: "0 6px 6px -2px #777" }}
      >
        <div style={{ display: "inline-block" }}>
          <img
            style={{ width: "65px", margin: "0px 10px 0px 0px" }}
            src={corgi}
            alt=""
          />
        </div>
        <div
          style={{
            color: "white",
            display: "inline-block",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        ></div>
      </Header>
    </Layout>
  );
}

function NavbarMobil(params) {
  //Gör en fetch på location
  <MyLocationFetch />;

  const { currentUser } = useAuth();

  if (currentUser) {
    return <User></User>;
  }
  return <Guest></Guest>;
}

export default NavbarMobil;
