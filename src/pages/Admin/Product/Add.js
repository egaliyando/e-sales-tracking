import React from "react";
import Navigation from "components/Navigation";
import { Link } from "react-router-dom";

function Add() {
  return (
    <div className="flex">
      <Navigation />
      <div className="w-11/12 p-3">
        <p className="my-3 font-bold">Add Product</p>
        <div className="bg-white rounded-lg shadow-lg p-5">
          <div className="mb-5">
            <label className="text-xs">Nama Produk</label>
            <input
              className="bg-gray-200 w-full p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
              type="text"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs">Tanggal Expired</label>
              <input
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="date"
              />
            </div>
            <div>
              <label className="text-xs">Harga</label>
              <input
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="number"
              />
            </div>
            <div>
              <label className="text-xs">Stok</label>
              <input
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="number"
              />
            </div>
            <div>
              <label className="text-xs">Gambar</label>
              <input
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="file"
              />
            </div>
          </div>
          <div className="flex mt-5 justify-end">
            <button
              className="text-white bg-red-500 px-3 shadow-lg p-2 rounded-lg background-transparent font-bold text-sm outline-none focus:outline-none"
              type="button"
              style={{ transition: "all .15s ease" }}
            >
              Batal
            </button>
            <Link
              to="/admin/product"
              className="bg-green-500 ml-3 px-3 shadow-lg p-2 rounded-lg text-white active:bg-green-600 font-bold text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none"
            >
              Tambah
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
