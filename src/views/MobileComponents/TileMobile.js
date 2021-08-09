import SMHIWarnings from "../SMHIWarnings";
import SMHIWarningSettings from "../SettingsComponents/SMHIWarningSettings";
import BrottsplatsKartan from "../BrottsplatsKartan";
import VMA from "../VMA";
import VMASettings from "../SettingsComponents/VMASettings";
import Trafikverket from "../Trafikverket";
import TrafikverketSettings from "../SettingsComponents/TrafikverketSettings";
import SL from "../SL";
import SLSettings from "../SettingsComponents/SLSettings";
import { useState } from "react";
import StandardSubSettings from "../SettingsComponents/StandardSubSettings";

import BrottsplatsKartanSettings from "../SettingsComponents/BrottsplatsKartanSettings";

const TileMobile = ({ id, tile, handleTileChange, apiAdd, preselected }) => {
  var thisTileData = StandardSubSettings(tile, "Tile");

  const [apiSelected, setAPISelected] = useState(thisTileData.apiSelected);
  const [selected, setSelected] = useState(thisTileData.selected);
  const [haveNewData, setHaveNewData] = useState(false);

  function saveChange() {
    {
      handleTileChange(thisTileData, id);
    }
  }

  const saveSettings = (setting) => {
    console.log("going through saveSettings");
    thisTileData.settingsData = setting;
    saveChange();
  };

  const ftSetup = () => {
    thisTileData.selected = preselected;
    thisTileData.apiSelected = true;
    setAPISelected(true);
    setSelected(preselected);
    saveChange();
  };

  if (apiSelected === false) {
    ftSetup();
  }

  const api = [
    {
      comp: (
        <SMHIWarnings
          setHaveNewData={setHaveNewData}
          settings={thisTileData.settingsData}
          isMobile="true"
          apiAdd={apiAdd}
        />
      ),
      compSettings: (
        <SMHIWarningSettings
          settings={thisTileData.settingsData}
          saveSettings={saveSettings}
          isMobile="true"
          apiAdd={apiAdd}
        />
      ),
    },
    {
      comp: (
        <BrottsplatsKartan
          setHaveNewData={setHaveNewData}
          settings={thisTileData.settingsData}
          isMobile="true"
          apiAdd={apiAdd}
        />
      ),
      compSettings: (
        <BrottsplatsKartanSettings
          settings={thisTileData.settingsData}
          saveSettings={saveSettings}
          isMobile="true"
          apiAdd={apiAdd}
        />
      ),
    },
    {
      comp: (
        <VMA
          setHaveNewData={setHaveNewData}
          isMobile="true"
          apiAdd={apiAdd}
          settings={thisTileData.settingsData}
        />
      ),
      compSettings: (
        <VMASettings
          isMobile="true"
          apiAdd={apiAdd}
          settings={thisTileData.settingsData}
          saveSettings={saveSettings}
        />
      ),
    },
    {
      comp: (
        <Trafikverket
          setHaveNewData={setHaveNewData}
          isMobile="true"
          apiAdd={apiAdd}
          settings={thisTileData.settingsData}
        />
      ),
      compSettings: (
        <TrafikverketSettings
          isMobile="true"
          apiAdd={apiAdd}
          settings={thisTileData.settingsData}
          saveSettings={saveSettings}
        />
      ),
    },
    {
      comp: (
        <SL
          setHaveNewData={setHaveNewData}
          settings={thisTileData.settingsData}
          isMobile="true"
          apiAdd={apiAdd}
        />
      ),
      compSettings: (
        <SLSettings
          settings={thisTileData.settingsData}
          isMobile="true"
          apiAdd={apiAdd}
          saveSettings={saveSettings}
        />
      ),
    },
  ];

  return <>{apiSelected ? <>{api[selected].comp}</> : <></>}</>;
};

export default TileMobile;
