import React, { useEffect, useState } from "react";
import Navigation from "components/Navigation";
import axios from "configs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Edit(props) {
  //deklarasi sweetalert
  const MySwal = withReactContent(Swal);
  //deklarasi state untuk menampung data inputan
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Image, setImage] = useState("");
  const [Lat, setLat] = useState("");
  const [Long, setLong] = useState("");
  //function get data apotik== data di get dulu untuk diletakan di text input
  const getData = () => {
    //deklarasi id / parsing id melalui params
    const { id } = props.match.params;
    //deklarasi token selalu
    const token = localStorage.token;
    axios
      .get(`/apotik/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //setelah data di get, maka data yang didapat akan di set kedalam state
        setLat(res.data.data.lat);
        setLong(res.data.data.long);
        setName(res.data.data.name);
        setAddress(res.data.data.address);
        setImage(res.data.data.image);
      })
      .catch((err) => {
        //untuk memangkap error ketika data miss
        console.log(err);
      });
  };

  //function untuk melakukan submit ketika selesai di edit
  const handleSubmit = (e) => {
    //parsing id jangan lupa gaes
    const { id } = props.match.params;
    //deklarasi token selalu
    const token = localStorage.token;
    //penggunaan sweetalert
    MySwal.fire({
      title: "Edit?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        MySwal.fire("Edit Success!", ":)", "info", "Canceled");
        axios
          .put(
            `/apotik/${id}`,
            {
              lat: Lat,
              long: Long,
              name: Name,
              address: Address,
              image: Image,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(function () {
            props.history.push("/admin/apotik");
          })
          .catch(function (error) {
            //push untuk memberitahu juka ada error / field kosong
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
        <p className="my-3 font-bold">Edit Apotek</p>
        <div className="bg-white rounded-lg shadow-lg p-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs">Lat</label>
              <input
                onChange={(e) => setLat(e.target.value)}
                className="bg-gray-200 w-full p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="text"
                name="lat"
                value={Lat}
              />
            </div>
            <div>
              <label className="text-xs">Long</label>
              <input
                onChange={(e) => setLong(e.target.value)}
                className="bg-gray-200 w-full p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="text"
                name="long"
                value={Long}
              />
            </div>
            <div>
              <label className="text-xs">Apotek Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-200 w-full p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="text"
                name="name"
                value={Name}
              />
            </div>
            <div>
              <label className="text-xs">Address</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="Text"
                name="address"
                value={Address}
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
              onClick={handleSubmit}
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
