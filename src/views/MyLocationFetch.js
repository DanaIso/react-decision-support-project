import axios from "axios";
import SaveData from "./save-load/SaveData";

const useLocation = async () => {
  axios
    .get(`https://freegeoip.app/json/`)
    .then((response) => {
      SaveData("Location", response.data);
    })
    .catch((err) => {
      alert(
        "Error: " +
          err +
          "\nThis could be caused by your addblocker. Turn it off and try again"
      );
    });
};

export default useLocation;
