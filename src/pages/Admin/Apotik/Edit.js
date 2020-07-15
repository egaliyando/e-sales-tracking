import React from "react";
import Navigation from "components/Navigation";
import { Link } from "react-router-dom";

function Edit() {
  return (
    <div className="flex">
      <Navigation />
      <div className="w-11/12 p-3">
        <p className="my-3 font-bold">Edit Apotik</p>
        <div className="bg-white rounded-lg shadow-lg p-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs">Nama Apotik</label>
              <input
                className="bg-gray-200 w-full p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="text"
              />
            </div>
            <div>
              <label className="text-xs">Alamat</label>
              <input
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="Text"
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
              to="/admin/apotik"
              className="bg-green-500 ml-3 px-3 shadow-lg p-2 rounded-lg text-white active:bg-green-600 font-bold text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
