import React from "react";
import Navigation from "components/Navigation";
import Table from "components/Table";

function Order() {
  return (
    <div className="flex">
      <Navigation />
      <div style={{ backgroundColor: "#F7F7F7" }} className="w-11/12 p-3 relative">
        <p className="my-3 font-bold">Produk</p>
        {/* MODAL */}
        <Table
          thead={[
            "No",
            "Nama Sales",
            "Nama Apotik",
            "Address",
            "Nama Produk",
            "Jumlah Produk",
            "Harga",
            "Notes",
            "Image",
            "Status",
            "Aksi",
          ]}
          tbody={[
            "1",
            "Okta",
            "Apotik Rossa",
            "Jl, Z.A Pagaralam",
            "Broncitin",
            "12",
            "Rp.200.000",
            "....",
            "img.jpg",
            "Order/Tidak",
            <button className="mx-5 focus:outline-none w-4" onClick={() => alert("Yakin Menghapus?")}>
              <img src={require(`assets/icons/ic_trash.svg`)} alt="add" />
            </button>,
          ]}
        />
      </div>
    </div>
  );
}

export default Order;
