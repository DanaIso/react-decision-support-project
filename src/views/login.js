import corgi from "./partsbymalin/corgi.png";
import { useHistory } from "react-router";
import { Row } from "antd";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import React, { useRef, useState } from "react";
import { auth, db } from "../config/firebase";

function Login(params) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [signIn, setSignIn] = useState(false);
  const [error, setError] = useState("")

  function GetSettings(user, key) {
    db.collection("UserGrid")
      .doc(String(user))
      .get()
      .then((d) => {
        const settings = d.data();
        if (typeof settings !== "undefined")
          localStorage.setItem("Grid", JSON.stringify(settings.ValueData));
        setTimeout(history.push("/TileView"), 500);
      });
    return true;
  }

    function checkLogin(params) {
        if (auth.currentUser) {
            history.push("/TileView")
        } else{
            history.push("/login")
        }
    }

    setTimeout(() => {checkLogin()
    }, 50);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      if (signIn) {
        await login(emailRef.current.value, passwordRef.current.value);
      } else {
        await signup(emailRef.current.value, passwordRef.current.value);
      }
      GetSettings(auth.currentUser.uid, "Grid");
    } catch(error) {
      setError(error.message)
     }
    setLoading(false);
  }
  return (
    <div>
      <Row justify="center">
        <h1
          style={{
            color: "#FFB96D",
            fontSize: "55px",
            padding: "0px",
            margin: "80px 0px 0px 0px",
          }}
        >
          Logga in
        </h1>
      </Row>
      <Row justify={"center"}>
        <img style={{ width: "200px", margin: "10px 0" }} src={corgi} alt="" />
      </Row>
      <Row justify="center">
        {error && <Alert variant="danger">{error}</Alert>}
      </Row>
      <Row justify={"center"}>
        <div style={{ width: "30%" }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Control
                placeholder="E-post"
                type="email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Control
                placeholder="Lösenord"
                type="password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Button
              onClick={() => setSignIn(true)}
              disabled={loading}
              className="w-100"
              type="submit"
              block
              style={{
                backgroundColor: "#FFB96D",
                borderColor: "#45A293",
                color: "white",
                borderRadius: "100px",
              }}
            >
              {" "}
              Logga in{" "}
            </Button>
            <Button
              onClick={() => setSignIn(false)}
              disabled={loading}
              className="w-100"
              type="submit"
              block
              style={{
                backgroundColor: "#FFB96D",
                borderColor: "#45A293",
                color: "white",
                borderRadius: "100px",
              }}
            >
              {" "}
              Skapa konto{" "}
            </Button>
          </Form>

            <Button
                onClick={() => history.push("/TileView")}
                disabled={loading}
                className="w-100"
                type="submit"
                block
                style={{
                  marginTop:"0.5rem",
                  backgroundColor: "#FFB96D",
                  borderColor: "#45A293",
                  color: "white",
                  borderRadius: "100px",
                }}
              >
                {" "}
                Gäst{" "}
              </Button>

        </div>
      </Row>
    </div>
  );
}

export default Login;
