import { Divider, Row, Col, Image } from "antd";
import Knapp from "./partsbymalin/Knapp";
import { useHistory } from "react-router";
import HelpButtonLocationDesktop from "./Images/HelpButtonLocationDesktop.png"

function AboutUs(params) {
  const history = useHistory();

  return (
    <div
      style={{
        margin: "30px 20px 0px 20px",
        color: "white",
        fontSize: "130%",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "white", margin: "20px" }}>
        Argos beslutsstöd av Team Baryon
      </h1>
      <Divider></Divider>

      <p>Vi utvecklar ett beslutstöd för allmänheten.</p>
      <p>
        Ett beslutsstöd ska fungera som ett hjälpmedel i vardagen, med viktig
        och/eller underlättande information om samhället. Vår ide är att
        användaren själv ska kunna bygga en individuell hemsida med information
        efter plats och personliga preferenser.
      </p>

      <p style={{ fontWeight: "bold", textDecoration: "underline" }}>Team:</p>
      <p> Axel, Dana, Gustav, Håkan, Malin, Marcus, Max och Rebecka.</p>
      <Row>
        <Col span={12}>
          <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
            Kontakt:
          </p>
          <div>
            <p>
              Nedan Zoomrum är öppet för frågor mellan 13-14 den 19/5 samt 20/5:
            </p>
            <a
              href="https://kth-se.zoom.us/j/65089207684"
              style={{ backgroundColor: "white" }}
            >
              https://kth-se.zoom.us/j/65089207684
            </a>
          </div>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScA64eItRCX6dnTpOkPXiVdsiIamnlqEJGi2Nunxr7dQbvmkg/viewform?embedded=true"
            width="640"
            height="515"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
          >
            Läser in …
          </iframe>
        </Col>
        <Col span={12}>
          <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
            Kort användarmanual:{" "}
          </p>
          <p>Quick guide finns i nedre högra hörnet på desktop</p>
          <Image src={HelpButtonLocationDesktop} width={300}/>
          
          <br></br>
          <br></br>
          <Knapp
            color="#FFB96D"
            backgroundcolor="white"
            text="Till livedemo"
            onClick={() => history.push("/login")}
          />
        </Col>
      </Row>
    </div>
  );
}
//We are developing a decision-support-website for the general public. The idea is to compile a website with a veriaty of APIs for the user to choose from and build their own costum desktop with relevant information depending on location, emergency and personal taste.

export default AboutUs;
