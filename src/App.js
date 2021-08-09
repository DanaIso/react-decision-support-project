import FrontPage from "./views/FrontPage";
import FrontPageMobile from "./views/MobileComponents/FrontPageMobile";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./views/Navbar";
import Login from "./views/login";
import AccountSettings from "./views/AccountSettings";
import SL from "./views/SL";

import LoginView from "./views/login";
import { AuthProvider } from "./contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

import MyLocationFetch from "./views/MyLocationFetch";
import useViewport from "./hooks/useResize";
import StandardSettings from "./views/SettingsComponents/StandardSettings";
import AboutUs from "./views/AboutUs";
import NavBarMobil from "./views/MOBILviews/NavBarMobil";
import LoginMobil from "./views/MOBILviews/LoginMobil";
import AccountSettingsMobil from "./views/MOBILviews/AccountSettingsMobil";
import AboutUsMobil from "./views/MOBILviews/AboutUsMobil";

function App() {
  StandardSettings();
  MyLocationFetch();
  const { width } = useViewport();
  const breakpoint = 750;

  return (
    <>
      <Router>
        <AuthProvider>
          {width > breakpoint ? <Navbar></Navbar> : <NavBarMobil></NavBarMobil>}

          <Switch>
            <Route path="/login">
              {width > breakpoint ? <Login></Login> : <LoginMobil></LoginMobil>}
            </Route>

            <Route path="/settings">
              {width > breakpoint ? (
                <AccountSettings></AccountSettings>
              ) : (
                <AccountSettingsMobil></AccountSettingsMobil>
              )}
            </Route>

            <Route path="/TileView">
              {width > breakpoint ? (
                <FrontPage> </FrontPage>
              ) : (
                <FrontPageMobile> </FrontPageMobile>
              )}
            </Route>

            <Route path="/AboutUS">
              {width > breakpoint ? (
                <AboutUs></AboutUs>
              ) : (
                <AboutUsMobil></AboutUsMobil>
              )}
            </Route>

            <Route path="/dev">
              <SL></SL>
            </Route>

            <Route path="/">
              <LoginView></LoginView>
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
