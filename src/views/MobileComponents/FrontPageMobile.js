import SMHIWarning from "../SMHIWarning";
import BrottplatsInfo from "../BrottplatsInfo";
import VMAInfo from "../VMAInfo";
import SLInfo from "../SLInfo";
import TrafikverketInfo from "../TrafikverketInfo";
import TileMobile from "./TileMobile";
import { Button, Card, Typography, Modal, Select, Checkbox, Image } from "antd";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import SaveData from "../save-load/SaveData.js";
import LoadData from "../save-load/LoadData.js";
import getTiles from "./getTiles.js";
import MobileSetting from "./MobileSetting";
import QuickGuideMobile from "../Images/QuickGuideMobile.png";

function FrontPageMobile(params) {
  const { currentUser } = useAuth();
  console.log(
    "🚀 ~ file: FrontPage.js ~ line 16 ~ FrontPage ~ currentUser",
    currentUser
  );

  const [pos, setPos] = useState(0);
  const [gridBlock, setGridBlock] = useState(LoadData("Grid"));
  const [apiData, setAPIData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [addingAPI, setAddingAPI] = useState(false);
  const [allowDuplicates, setAllowDuplicates] = useState(LoadData("Duplicate"));
  const [firstTime, setFirstTime] = useState(LoadData("FirstTime"));
  const [selected, setSelected] = useState(0);
  const [forcedRender, setForcedRender] = useState(0);
  const [showGuide, setShowGuide] = useState(false);

  // Settings modal states
  const [tiles, setTiles] = useState(getTiles(gridBlock));
  const [thisTile, setThisTile] = useState(null);
  const [id, setId] = useState(null);

  // Remove tile modal states
  const [showRemove, setShowRemove] = useState(false);
  const [removeId, setRemoveId] = useState(null);

  const sortArray = (newData) => {
    newData.sort(sortingByDate);
    setForcedRender(forcedRender + 1);
    setAPIData(newData);
  };

  const apiAdd = async (data) => {
    console.log("This is data: " + JSON.stringify(data));

    const newData = [...apiData, ...data];
    setAPIData([]);
    console.log("This is newdata: " + JSON.stringify(newData));

    //console.log("This is before: " + JSON.stringify(apiData))
    sortArray(newData);
  };

  const handleTileChange = (newTile, id) => {
    console.log("starting handleTileChange");
    const newArray = [];
    const temp = [...gridBlock];
    temp.forEach((element) => {
      var newElement = {
        key: element.key,
        x: element.x,
        y: element.y,
        w: element.w,
        h: element.h,
        maxH: element.maxH,
        maxW: element.maxW,
        tile: chooseTile(newTile, id, element.key),
      };
      newArray.push(newElement);
      console.log(newElement);
    });
    console.log(newArray);
    setGridBlock(newArray);
    SaveData("Grid", newArray);
  };

  const addBlockClick = () => {
    var nextKey = 0;

    setAddingAPI(false);

    if (gridBlock.length > 0) nextKey = gridBlock[gridBlock.length - 1].key + 1;

    setGridBlock((gridBlock) => [
      ...gridBlock,
      { key: nextKey, x: pos, y: 0, w: 3, h: 6, maxW: 10, maxH: 20, tile: [] },
    ]);
    setPos((pos + 3) % 12);
  };

  const removeBlock = (key) => {
    const filtered = gridBlock.filter((v) => {
      return v.key !== key;
    });
    setGridBlock(filtered);
    SaveData("Grid", filtered);
  };

  const sortingByDate = (a, b) => {
    return b.date - a.date;
  };

  function getTile(key) {
    for (var i = 0; i < gridBlock.length; i++) {
      if (gridBlock[i].key == key) {
        return gridBlock[i].tile;
      }
    }
  }

  function chooseTile(newTile, id, key) {
    if (id == key) return newTile;
    else return getTile(key);
  }

  // Modal for settings
  const showSettings = () => {
    setTiles(getTiles(gridBlock));
    setShowModal(true);
  };

  const handleOk = () => {
    setShowModal(false);
    window.location.reload(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  const handleChange = (value) => {
    setSelected(value);
  };

  const handleFirstTime = () => {
    setFirstTime(false);
    SaveData("FirstTime", false);
  };

  const { Option } = Select;

  const children = [];

  tiles.forEach((element) => {
    children.push(<Option key={element.key}>{element.name}</Option>);
  });

  function getTile(key) {
    for (var i = 0; i < gridBlock.length; i++) {
      if (gridBlock[i].key == key) {
        return gridBlock[i].tile;
      }
    }
  }

  function handleSettingsChange(value) {
    setId(value);
    setThisTile(getTile(value));
  }

  function saveChanges(value) {
    let temp = thisTile;
    temp.settingsData = value;

    setThisTile(temp);
    handleTileChange(temp, id);
  }

  const handleRemove = (key) => {
    setRemoveId(key);
  };

  const removeOk = () => {
    removeBlock(parseInt(removeId));
    window.location.reload(false);
  };

  // End of modal settings

  // console.log("gridblock: " + JSON.stringify(gridBlock));

  var inUse = [false, false, false, false, false];

  return (
    <div>
      <Button
        className="addApiButton"
        style={{
          backgroundColor: "#0f5062",
          color: "white",
          border: "none",
          borderRadius: "45px",
        }}
        onClick={() => setAddingAPI(!addingAPI)}
      >
        Lägg nytt kort
      </Button>
      <Button
        className="addApiButton"
        style={{
          backgroundColor: "#0f5062",
          color: "white",
          border: "none",
          borderRadius: "45px",
        }}
        onClick={() => showSettings()}
      >
        Inställningar
      </Button>

      <Button
        className="addApiButton"
        style={{
          backgroundColor: "#0f5062",
          color: "white",
          border: "none",
          borderRadius: "45px",
        }}
        onClick={() => {
          setShowRemove(true);
          setTiles(getTiles(gridBlock));
        }}
      >
        Ta bort ett kort
      </Button>

      <Button
        className="addApiButton"
        style={{
          backgroundColor: "#0f5062",
          color: "white",
          border: "none",
          borderRadius: "45px",
        }}
        onClick={() => {
          setShowGuide(true);
        }}
      >
        Quick Guide
      </Button>

      <Modal
        title="Tips"
        visible={firstTime}
        closable={false}
        footer={[
          <Button key="submit" type="primary" onClick={() => handleFirstTime()}>
            Uppfattat
          </Button>,
        ]}
      >
        <p>Visa mer/mindre information genom att trycka på rubrikerna!</p>
      </Modal>

      <Modal
        title="Inställningar"
        visible={showModal}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Uppdatera
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        <>
          <Checkbox
            style={{ margin: "10px" }}
            defaultChecked={allowDuplicates}
            onChange={() => {
              SaveData("Duplicate", !allowDuplicates);
              console.log(!allowDuplicates);
              setAllowDuplicates(!allowDuplicates);
              window.location.reload(false);
            }}
          >
            Visa duplikeringar av ett API
          </Checkbox>

          <Select style={{ width: "50%" }} onChange={handleSettingsChange}>
            {children}
          </Select>
        </>
        <>
          {thisTile === null ? (
            <></>
          ) : (
            <MobileSetting thisTileData={thisTile} saveSettings={saveChanges} />
          )}
        </>
      </Modal>

      <Modal
        visible={addingAPI}
        title="Välj API"
        okText="Lägg till"
        cancelText="Avbryt"
        onCancel={() => setAddingAPI(!addingAPI)}
        onOk={addBlockClick}
      >
        <Select
          defaultValue={0}
          style={{ width: "80%" }}
          onChange={handleChange}
        >
          <option value={0}>SMHI</option>
          <option value={1}>BrottsplatsKartan</option>
          <option value={2}>VMA</option>
          <option value={3}>Trafikverket</option>
          <option value={4}>SL</option>
        </Select>
      </Modal>

      <Modal
        visible={showRemove}
        title="Välj ett kort att ta bort"
        okText="Ta bort"
        cancelText="Avbryt"
        onCancel={() => setShowRemove(false)}
        onOk={removeOk}
      >
        <Select style={{ width: "80%" }} onChange={handleRemove}>
          {children}
        </Select>
      </Modal>

      <Modal
        title="Quick guide for mobile use"
        visible={showGuide}
        onCancel={() => setShowGuide(false)}
        footer={[]}
      >
        <Image src={QuickGuideMobile} width="100%"></Image>
      </Modal>

      {gridBlock.map((value) => {
        console.log(
          "This is in Use: " +
            value.tile.selected +
            " = " +
            inUse[value.tile.selected]
        );

        if (allowDuplicates || !inUse[value.tile.selected]) {
          inUse[value.tile.selected] = true;

          return (
            <TileMobile
              id={value.key}
              tile={value.tile}
              handleTileChange={handleTileChange}
              removeBlock={removeBlock}
              apiAdd={apiAdd}
              preselected={selected}
            />
          );
        }
      })}

      {apiData &&
        apiData.map((value, index) => {
          console.log("map value:");
          console.log(value);
          console.log(index);
          const apiInit = [
            {
              comp: (
                <SMHIWarning
                  key={index}
                  headline={value.headline}
                  event={value.event}
                  desc={value.desc}
                  severity={value.severity}
                  color={value.color}
                  callback={value.callback}
                  settings={value.settings}
                  isMobile="true"
                />
              ),
              title: "SMHI",
              tileColor: "#6D8DFF",
            },
            {
              comp: (
                <BrottplatsInfo
                  key={index}
                  desc={value.desc}
                  type={value.type}
                  location={value.location}
                  time={value.time}
                  content={value.content}
                  image={value.image}
                  callback={value.callback}
                  settings={value.settings}
                  isMobile="true"
                />
              ),

              title: "BrottsplatsKartan",
              tileColor: "#7EB6AC",
            },
            {
              comp: (
                <VMAInfo
                  desc={value.desc}
                  title={value.title}
                  url={value.url}
                  id={value.id}
                  date={value.date}
                  notification={value.notification}
                  isMobile="true"
                />
              ),
              title: "VMA",
              tileColor: "#A40000",
            },
            {
              comp: (
                <SLInfo
                  key={value.key}
                  id={value.id}
                  desc={value.desc}
                  header={value.header}
                  line={value.line}
                  time={value.time}
                  mainNews={value.mainNews}
                  callback={value.callback}
                  settings={value.settings}
                  isMobile="true"
                />
              ),

              title: "SL",
              tileColor: "#008ED7",
            },
            {
              comp: (
                <TrafikverketInfo
                  key={index}
                  id={value.id}
                  headline={value.headline}
                  time={value.time}
                  road={value.road}
                  severity={value.severity}
                  location={value.location}
                  position={value.position}
                  callback={value.callback}
                  settings={value.settings}
                  notification={value.notification}
                  isoTime={value.isoTime}
                  isMobile="true"
                />
              ),

              title: "Trafikverket",
              tileColor: "#ee4f57",
            },
          ];
          return (
            <Card
              key={index}
              title={
                <Typography.Title level={5} className="tileHeader">
                  {apiInit[value.idArray].title}
                </Typography.Title>
              }
              style={{
                backgroundColor: apiInit[value.idArray].tileColor,
                overflowY: "auto",
                width: "90vw",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              {apiInit[value.idArray].comp}
            </Card>
          );
        })}
    </div>
  );
}

export default FrontPageMobile;
