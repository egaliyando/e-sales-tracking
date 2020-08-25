import React, { useState } from "react";
import Navigation from "components/Navigation";
import axios from "configs";
import Swal from "sweetalert2";
import {Link} from "react-router-dom"
import withReactContent from "sweetalert2-react-content";

function Add(props) {
  const [product, setProduct] = useState("");
  const [expired, setExpired] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const token = localStorage.token;
  const MySwal = withReactContent(Swal);

  const handleSubmit = () => {
    console.log(image);
    let formData = new FormData(); //formdata object
    formData.append("name", product);
    formData.append("tgl_ex", expired);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", image);
    MySwal.fire({
      title: "Add Product?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        axios
          .post("/product", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(function (response) {
            console.log(response);
            MySwal.fire("Add Success!", ":)", "warning", "Canceled");

            props.history.push("/admin/product");
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
        <p className="my-3 font-bold">Add Product</p>
        <div className="bg-white rounded-lg shadow-lg p-5">
          <div className="mb-5">
            <label className="text-xs">Product Name</label>
            <input
              onChange={(e) => setProduct(e.target.value)}
              className="bg-gray-200 w-full p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
              type="text"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs">Expired</label>
              <input
                onChange={(e) => setExpired(e.target.value)}
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="date"
              />
            </div>
            <div>
              <label className="text-xs">Price</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="number"
              />
            </div>
            <div>
              <label className="text-xs">Stock</label>
              <input
                onChange={(e) => setStock(e.target.value)}
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="number"
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
            <Link to="/admin/product"
              className="text-white bg-red-500 px-3 shadow-lg p-2 rounded-lg background-transparent font-bold text-sm outline-none focus:outline-none"
              type="button"
              style={{ transition: "all .15s ease" }}
            >
              Cancel
            </Link>
            <button
              onClick={handleSubmit}
              className="bg-green-500 ml-3 px-3 shadow-lg p-2 rounded-lg text-white active:bg-green-600 font-bold text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none"
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
