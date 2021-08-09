import Tile from "./Tile";

import { Button, Modal, Image } from "antd";
import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { useAuth } from "../contexts/AuthContext";
import SaveData from "./save-load/SaveData.js";
import LoadData from "./save-load/LoadData.js";
import QuickGuideProjekt from "./Images/QuickGuideProjekt.png"

const ResponsiveGridLayout = WidthProvider(Responsive);

function FrontPage(params) {
  const { currentUser } = useAuth();
  console.log(
    "🚀 ~ file: FrontPage.js ~ line 16 ~ FrontPage ~ currentUser",
    currentUser
  );

  const [pos, setPos] = useState(0);
  const [gridBlock, setGridBlock] = useState(LoadData("Grid"));
  const [showHelp, setShowHelp] = useState(false)

  const addBlockClick = () => {
    var nextKey = 0;

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
  };

  function handleChange(newLayout) {
    const newArray = [];

    newLayout.forEach((element) => {
      var newElement = {
        key: parseInt(element.i),
        x: element.x,
        y: element.y,
        w: element.w,
        h: element.h,
        maxH: element.maxH,
        maxW: element.maxW,
        tile: getTile(parseInt(element.i)),
      };
      newArray.push(newElement);
    });
    setGridBlock(newArray);
    SaveData("Grid", newArray);
  }

  function getTile(key) {
    for (var i = 0; i < gridBlock.length; i++) {
      if (gridBlock[i].key === key) {
        return gridBlock[i].tile;
      }
    }
  }

  function chooseTile(newTile, id, key) {
    if (id === key) return newTile;
    else return getTile(key);
  }

  const handleTileChange = (newTile, id) => {
    console.log("starting handleTileChange");
    const newArray = [];
    gridBlock.forEach((element) => {
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

  return (
    <div style={{ textAlign: "center" }}>
      <Button
        className="addApiButton"
        style={{
          backgroundColor: "#0f5062",
          color: "white",
          border: "none",
          borderRadius: "45px",
          display: "inline-block",
          marginTop: "0.5 rem",
        }}
        onClick={() => addBlockClick()}
      >
        Lägg till nytt kort
      </Button>

      <Button
        style={{
          position: "fixed",
          bottom: "0px",
          right: "0px" 
        }}
        onClick={() => setShowHelp(true)}
      >
        Help Guide
      </Button>

      <Modal
        title="Quick Guide"
        visible={showHelp}
        onCancel={() => setShowHelp(false)}
        footer={[
          <Button key="submit" type="primary" onClick={() => setShowHelp(false)}>
            Uppfattat
          </Button>,
        ]}
      >
        <p>Click on the image and zoom with scroll if it is hard to read</p>
        <Image src={QuickGuideProjekt} width={"100%"} alt="" />
      </Modal>

      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1200 }}
        rowHeight={30}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        measureBeforeMount={false}
        compactType={"vertical"}
        resizeHandles={["se"]}
        onLayoutChange={handleChange}
      >
        {gridBlock.map((value) => {
          return (
            <div
              key={value.key}
              data-grid={{
                key: value.key,
                x: value.x,
                y: value.y,
                w: value.w,
                h: value.h,
                maxW: value.maxW,
                maxH: value.maxH,
                tile: value.tile,
              }}
            >
              <Tile
                id={value.key}
                tile={value.tile}
                handleTileChange={handleTileChange}
                removeBlock={removeBlock}
              />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
}

export default FrontPage;
