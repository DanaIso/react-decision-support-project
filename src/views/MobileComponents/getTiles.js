const getTiles = (Grid) => {
  const api = [
    "SMHI",
    "Brottsplatskartan",
    "VMA",
    "Trafikverket",
    "SL",
  ];

  const filtered = [];
  Grid.forEach((element) => {
    var keyName = {
      key: element.key,
      inUse: element.tile.apiSelected,
      name: api[element.tile.selected],
      nameId: element.tile.selected,
    };
    if (keyName.inUse) filtered.push(keyName);
  });

  return filtered;
};

export default getTiles;
