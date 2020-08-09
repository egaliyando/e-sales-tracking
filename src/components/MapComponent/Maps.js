import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { iconSales, iconApotik } from "components/MapComponent/IconMarker";
import axios from "configs";

export default class Maps extends Component {
  state = {
    data: [
      [-5.45, 105.26667],
      [-5.46, 105.2669],
      [-5.48, 105.26695],
    ],
    dataApotik: [
      [-5.55, 105.26667],
      [-5.56, 105.2669],
      [-5.58, 105.26695],
    ],
    lat: -5.45,
    lng: 105.26667,
    zoom: 9,
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    const { data, dataApotik } = this.state;

    return (
      <Map style={{ width: "100%", height: "100%" }} center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((data, i) => {
          return (
            <Marker position={data} icon={iconApotik} key={i}>
              <Popup>
                Apotik Rosa <br /> Jl. Abdul muis
              </Popup>
            </Marker>
          );
        })}
        {dataApotik.map((data, i) => {
          return (
            <Marker position={data} icon={iconSales} key={i}>
              <Popup>
                Sales - Budi <br /> Active
              </Popup>
            </Marker>
          );
        })}
      </Map>
    );
  }
}
