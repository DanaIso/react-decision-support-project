
import SMHIWarningSettings from "../SettingsComponents/SMHIWarningSettings.js";
import BrottsplatsKartanSettings from "../SettingsComponents/BrottsplatsKartanSettings";
import VMASettings from "../SettingsComponents/VMASettings";
import TrafikverketSettings from "../SettingsComponents/TrafikverketSettings";
import SLSettings from "../SettingsComponents/SLSettings";

const MobileSetting = ({ thisTileData, saveSettings }) => {
  const settingsMenu = [
    <SMHIWarningSettings
      settings={thisTileData.settingsData}
      saveSettings={saveSettings}
    />,
    <BrottsplatsKartanSettings
      settings={thisTileData.settingsData}
      saveSettings={saveSettings}
    />,
    <VMASettings
      settings={thisTileData.settingsData}
      saveSettings={saveSettings}
    />,
    <TrafikverketSettings
      settings={thisTileData.settingsData}
      saveSettings={saveSettings}
    />,
    <SLSettings
      settings={thisTileData.settingsData}
      saveSettings={saveSettings}
    />,
  ];

  return <>{settingsMenu[thisTileData.selected]}</>;
};

export default MobileSetting;
