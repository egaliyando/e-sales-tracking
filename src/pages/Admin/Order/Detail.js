import React from "react";
import Navigation from "components/Navigation";
import Table from "components/Table";

function Detail() {
  return (
    <div className="flex">
      <Navigation />
      <div className="w-11/12">
        <div className="mx-5 p-5 mt-5 bg-white rounded-lg h-auto shadow-md">
          <p className="font-bold pb-5">Detail Order</p>
          <div className="w-full grid grid-cols-2 gap-3 pb-5">
            <p className="text-sm">id_order :</p>
            <p className="text-sm">Sales :</p>
            <p className="text-sm">Apotik :</p>
            <p className="text-sm">Status :</p>
            <p className="text-sm">Alamat :</p>
          </div>
          <Table thead={["No", "Produk", "Jumlah", "Harga"]} tbody={["1", "Broncitin", "4", "Rp.200.0000"]} />
          <p className="font-bold mt-5">Total Harga :</p>
        </div>
        <button className="absolute bottom-0 focus:outline-none right-0 mb-10 mr-10">
          <img className="w-12 rounded-full shadow-lg" src={require(`assets/icons/ic_print.svg`)} alt="add" />
        </button>
      </div>
    </div>
  );
}

export default Detail;
