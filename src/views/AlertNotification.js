import { notification, Button } from "antd";
import { WarningOutlined } from "@ant-design/icons";

const AlertNotification = (id, title, desc, parsedTime, API) => {
  let seenIdList = [];
  if (localStorage.getItem("AlertNotification-SeenId") != null) {
    seenIdList = JSON.parse(localStorage.getItem("AlertNotification-SeenId"));
  }

  function onClick() {
    notification.close(API + id);
    if (localStorage.getItem("AlertNotification-SeenId") != null) {
      seenIdList = JSON.parse(localStorage.getItem("AlertNotification-SeenId"));
    }
    seenIdList.push(API + id);
    if (seenIdList.length === 20) {
      seenIdList = seenIdList.slice(9);
    }
    localStorage.setItem(
      "AlertNotification-SeenId",
      JSON.stringify(seenIdList)
    );
  }

  const confirmButton = (
    <Button type="primary" size="small" onClick={onClick}>
      Uppfattat
    </Button>
  );

  const descriptionElement = (
    <p>
      Utfärdat: {parsedTime}
      <br />
      {desc}
    </p>
  );

  const args = {
    key: API + id,
    message: title,
    description: descriptionElement,
    duration: 0,
    icon: <WarningOutlined style={{ color: "red" }} />,
    top: 100,
    style: { backgroundColor: "yellow" },
    btn: confirmButton,
    closeIcon: " ",
  };
  if (!seenIdList.includes(args.key)) {
    notification.open(args);
  }
};
export default AlertNotification;
