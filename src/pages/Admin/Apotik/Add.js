import React, { useState } from "react";
import Navigation from "components/Navigation";
import axios from "configs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Add(props) {
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Image, setImage] = useState("");
  const [Lat, setLat] = useState("");
  const [Long, setLong] = useState("");
  const token = localStorage.token;

  const MySwal = withReactContent(Swal);

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("name", Name);
    formData.append("address", Address);
    formData.append("image", Image);
    formData.append("lat", Lat);
    formData.append("long", Long);

    MySwal.fire({
      title: "Add Apotik?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        axios
          .post("/apotik", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(function (response) {
            console.log(response);
            MySwal.fire("Add Success!", ":)", "warning", "Canceled");
            props.history.push("/admin/apotik");
          })
          .catch(function (error) {
            console.log(error.response.data.error);
            let err = [];
            for (let i = 0; i < error.response.data.error.length; i++) {
              err.push(error.response.data.error[i].param);
            }
            MySwal.fire("Pastikan Data Terisi");
          });
      }
    });
  };

  return (
    <div className="flex">
      <Navigation />
      <div className="w-11/12 p-3">
        <p className="my-3 font-bold">Add Apotek</p>
        <div className="bg-white rounded-lg shadow-lg p-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs">Apotek Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-200 w-full p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="text"
              />
            </div>
            <div>
              <label className="text-xs">Address</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="Text"
              />
            </div>
            <div>
              <label className="text-xs">Lat</label>
              <input
                onChange={(e) => setLat(e.target.value)}
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="Text"
              />
            </div>
            <div>
              <label className="text-xs">Long</label>
              <input
                onChange={(e) => setLong(e.target.value)}
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="Text"
              />
            </div>
            <div>
              <label className="text-xs">Image</label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="file"
                name="file"
              />
            </div>
          </div>
          <div className="flex mt-5 justify-end">
            <Link
              to="/admin/apotik"
              className="text-white bg-red-500 px-3 shadow-lg p-2 rounded-lg background-transparent font-bold text-sm outline-none focus:outline-none"
              type="button"
              style={{ transition: "all .15s ease" }}
            >
              Cancel
            </Link>
            <button
              className="bg-green-500 ml-3 px-3 shadow-lg p-2 rounded-lg text-white active:bg-green-600 font-bold text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none"
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
