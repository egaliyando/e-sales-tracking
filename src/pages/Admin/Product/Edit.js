import React, { useState, useEffect } from "react";
import Navigation from "components/Navigation";
import { Link } from "react-router-dom";
import axios from "configs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Edit(props) {
  const MySwal = withReactContent(Swal);

  const [name, setName] = useState("");
  const [expired, setExpired] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  //const [idProduct, setIdProduct] = useState("");

  console.log(name);
  console.log(expired);
  console.log(price);
  console.log(stock);
  console.log(image);

  const getData = () => {
    const { id } = props.match.params;
    const token = localStorage.token;

    axios
      .get(`/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setName(res.data.data.name);
        setExpired(res.data.data.tgl_ex);
        setPrice(res.data.data.price);
        setStock(res.data.data.stock);
        setImage(res.data.data.image);
        // setIdProduct(res.data.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (e) => {
    const { id } = props.match.params;
    const token = localStorage.token;
    let formData = new FormData();
    formData.append("name", name);
    formData.append("tgl_ex", expired);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", image);

    MySwal.fire({
      title: "Edit Product?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((res) => {
      if (res) {
        MySwal.fire("Edit Success", "", "success", "Canceled");
        axios
          .put(`/product/${id}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(function (res) {
            console.log(res);
            props.history.push("/admin/product");
          })
          .catch(function (error) {
            console.log(error.res.data.error);
            // let error = [];
            for (let i = 0; i < error.res.data.error.length; i++) {
              error.push(error.response.data.error[i].param);
            }
            alert(error);
          });
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex">
      <Navigation />
      <div className="w-11/12 p-3">
        <p className="my-3 font-bold">Edit Product</p>
        <div className="bg-white rounded-lg shadow-lg p-5">
          <div className="mb-5">
            <label className="text-xs">Product Name</label>
            <input
              className="bg-gray-200 w-full p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs">Expired</label>
              <input
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="date"
                name="expired"
                value={expired}
                onChange={(e) => setExpired(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs">Harga</label>
              <input
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs">Stock</label>
              <input
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="number"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs">Image</label>
              <input
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
          <div className="flex mt-5 justify-end">
            <Link
              to="/admin/product"
              className="text-white bg-red-500 px-3 shadow-lg p-2 rounded-lg background-transparent font-bold text-sm outline-none focus:outline-none"
              type="button"
              style={{ transition: "all .15s ease" }}
            >
              Cancel
            </Link>
            <button
              onClick={handleUpdate}
              className="bg-green-500 ml-3 px-3 shadow-lg p-2 rounded-lg text-white active:bg-green-600 font-bold text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
