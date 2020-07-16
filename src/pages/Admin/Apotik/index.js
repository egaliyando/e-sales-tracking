import React from "react";
import Navigation from "components/Navigation";
import Table from "components/Table";
import { Link } from "react-router-dom";

function Apotik() {
  return (
    <div className="flex">
      <Navigation />
      <div style={{ backgroundColor: "#F7F7F7" }} className="w-11/12 p-3 relative">
        <p className="my-3 font-bold">Apotik</p>
        <Table
          thead={["No", "Apotik Name", "Address", "Status", "Action"]}
          tbody={[
            "1",
            "Apotik Persada",
            "Jl. Z.A Pagar alam",
            "Active",
            <div className="flex">
              <Link to="/admin/apotik/edit" className="focus:outline-none w-5">
                <img src={require(`assets/icons/ic_pencil.svg`)} alt="add" />
              </Link>
              <button className="mx-5 focus:outline-none w-4" onClick={() => alert("Yakin Menghapus?")}>
                <img src={require(`assets/icons/ic_trash.svg`)} alt="add" />
              </button>
            </div>,
          ]}
        />
      </div>
      <Link to="/admin/apotik/add" className="absolute bottom-0 focus:outline-none right-0 mb-10 mr-10">
        <img className="w-12 rounded-full shadow-lg " src={require(`assets/icons/ic_add.svg`)} alt="add" />
      </Link>
    </div>
  );
}

export default Apotik;
