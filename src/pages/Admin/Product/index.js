import React from "react";
import Navigation from "components/Navigation";
import Table from "components/Table";
import { Link } from "react-router-dom";

export default function Product() {
  return (
    <div className="flex">
      <Navigation />
      <div style={{ backgroundColor: "#F7F7F7" }} className="w-11/12 p-3 relative">
        <p className="my-3 font-bold">Product</p>
        {/* MODAL */}
        <Table
          thead={["No", "Product Name", "Expired", "Price", "Stock", "Image", "Action"]}
          tbody={[
            "1",
            "Broncitin",
            "12/12/20",
            "Rp.200.000",
            "100",
            "img.jpg",
            <div className="flex">
              <Link to="/admin/product/edit" className="focus:outline-none w-5">
                <img src={require(`assets/icons/ic_pencil.svg`)} alt="add" />
              </Link>
              <button className="mx-5 focus:outline-none w-4" onClick={() => alert("Yakin Menghapus?")}>
                <img src={require(`assets/icons/ic_trash.svg`)} alt="add" />
              </button>
            </div>,
          ]}
        />
      </div>
      <Link to="/admin/product/add" className="absolute bottom-0 focus:outline-none right-0 mb-10 mr-10">
        <img className="w-12 rounded-full shadow-lg " src={require(`assets/icons/ic_add.svg`)} alt="add" />
      </Link>
    </div>
  );
}
