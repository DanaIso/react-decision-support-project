import {Col, Divider, Image} from "antd";
import Knapp from "../partsbymalin/Knapp";
import { useHistory } from "react-router";
import HelpButtonLocationMobile from "../Images/HelpButtonLocationMobile.png"

function AboutUsMobil(params) {
    const history= useHistory();
  return (
    <>
      <div
      style={{
        margin: "30px 20px 0px 20px",
        color: "white",
        fontSize: "130%",
        textAlign: "center",
      }}
    >

      <h1 style={{ color: 'white', margin: '20px' }}>Argos beslutsstöd av Team Baryon</h1>
      <Divider></Divider>


      <p>Vi utvecklar ett beslutstöd för allmänheten.</p>
      <p>Ett beslutsstöd ska fungera som ett hjälpmedel i vardagen, med viktig och/eller underlättande information om samhället.
            Vår ide är att användaren själv ska kunna bygga en individuell hemsida med information efter plats och personliga preferenser.</p>

      <p style={{ fontWeight: 'bold',textDecoration: 'underline'}}>Team:</p>
      <p> Axel, Dana, Gustav, Håkan, Malin, Marcus, Max och Rebecka.</p>
      <p style={{ fontWeight: 'bold',textDecoration: 'underline'}}>Kontakt: </p>
      <p>Nedan Zoomrum är öppet för frågor mellan 13-14 den 19/5 samt 20/5:</p>
      <a href="https://kth-se.zoom.us/j/65089207684" style={{backgroundColor:"white"}}>https://kth-se.zoom.us/j/65089207684</a>
    </div>
        <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScA64eItRCX6dnTpOkPXiVdsiIamnlqEJGi2Nunxr7dQbvmkg/viewform?embedded=true"
            width="100%" height="535" frameBorder="0" marginHeight="0" marginWidth="0" scrolling="no">Läser in …
        </iframe>

        <div
            style={{
                margin: "30px 20px 0px 20px",
                color: "white",
                fontSize: "130%",
                textAlign: "center",
            }}
        >
        <p style={{ fontWeight: 'bold', textDecoration: 'underline'}}>Kort användarmanual: </p>
        <p>Guide finns uppe med resten av knapparna</p>
        <Image src={HelpButtonLocationMobile} width={150}/>
        <br></br>
        <br></br>
        <Knapp
            color="#FFB96D"
            backgroundcolor="white"
            text="Till livedemo"
            onClick={() => history.push("/login")}
        />
        </div>
    </>
  );
}

export default AboutUsMobil;
