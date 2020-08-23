import React from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import useGeolocation from "react-hook-geolocation";

function ChatSupervisor(props) {
  const geolocation = useGeolocation();
  return (
    <Container>
      <Header hSupervisor={true} />

      <div style={{ paddingTop: "4rem" }} className="px-3">
        <div className="w-64 h-auto p-2 bg-white float-left mt-3 rounded-lg">
          <p className="text-xs text-gray-400">18/19/2020</p>
          <p className="text-sm">Laporan barang telah terjual dengan sangat baik</p>
        </div>
        <div className="w-64 p-2 h-auto bg-white float-right rounded-lg mt-3">
          <p className="text-xs text-gray-400">18/19/2020</p>
          <p className="text-sm">Laporan diterima! Laksanakan!</p>
        </div>
      </div>
      {/* <div>
        <p>Latitude: {geolocation.latitude}</p>
        <p>Longitude: {geolocation.longitude}</p>
        <p>Location accuracy: {geolocation.accuracy}</p>
        <p>Heading: {geolocation.heading}</p>
        <p>Speed: {geolocation.speed}</p>
        <p>Timestamp: {geolocation.timestamp}</p>
      </div> */}

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <div className="w-full h-12 bg-white flex justify-between py-2 px-5 mb-1">
          <input className="focus:outline-none w-full" type="text" placeholder="Write message.." />

          <button className="focus:outline-none">
            <img src={require(`assets/icons/ic_send.svg`)} alt="send" />
          </button>
        </div>
        <MobileNav isSupervisor={true} {...props} />
      </div>
    </Container>
  );
}

export default ChatSupervisor;
