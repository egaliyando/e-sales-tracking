import React from "react";
import Navigation from "components/Navigation";
import Table from "components/Table";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Chat() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);

  if (token === "") {
    return <Redirect to="/" />;
  }
  return (
    <div className="flex">
      <Navigation />
      <div
        style={{ backgroundColor: "#F7F7F7" }}
        className="w-11/12 p-3 relative"
      >
        <p className="my-3 font-bold">Chat</p>
        <Table
          thead={["No", "Tanggal", "Chat", "Pengirim"]}
          tbody={["1", "12/12/2020", "Isi Chat", "Budi"]}
        />
      </div>
    </div>
  );
}

export default Chat;
