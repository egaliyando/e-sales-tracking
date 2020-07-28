import L from "leaflet";

const iconSales = new L.Icon({
  iconUrl: require("assets/icons/maps/sales.svg"),
  iconRetinaUrl: require("assets/icons/maps/sales.svg"),
  iconSize: new L.Point(60, 75),
});

const iconApotik = new L.Icon({
  iconUrl: require("assets/icons/maps/apotik.svg"),
  iconRetinaUrl: require("assets/icons/maps/apotik.svg"),
  iconSize: new L.Point(60, 75),
});

export { iconSales, iconApotik };
