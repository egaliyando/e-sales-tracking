import React, { useState, useEffect } from "react";
import Navigation from "components/Navigation";
import { Link } from "react-router-dom";
import axios from "configs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Edit(props) {
  const MySwal = withReactContent(Swal);

  const [fullName, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [birthDay, setBirthday] = useState("");
  const [userName, setUsername] = useState("");
  const [nik, setNik] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [image, setImage] = useState("");
  console.log("userId");
  console.log(userId);

  const getData = () => {
    const { id } = props.match.params;
    const token = localStorage.token;
    axios
      .get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setFullname(res.data.data.fullname);
        setAddress(res.data.data.address);
        setBirthday(res.data.data.ttl);
        setNik(res.data.data.user.nik);
        setUsername(res.data.data.user.username);
        setRole(res.data.data.user.role);
        setPassword(res.data.data.user.password);
        setUserId(res.data.data.user_id);
        setImage(res.data.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = () => {
    const { id } = props.match.params;
    const token = localStorage.token;
    let formData = new FormData();
    formData.append("username", userName);
    formData.append("fullname", fullName);
    formData.append("ttl", birthDay);
    formData.append("image", image);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("nik", nik);
    formData.append("user_id", userId);

    MySwal.fire({
      title: "Edit User?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((res) => {
      MySwal.fire("Edit Success", ":)", "warning", "Canceled");
      if (res) {
        axios
          .put(`/users/${id}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(function (res) {
            console.log("res");
            console.log(res);
            props.history.push("/admin/users");
          })
          .catch(function (error) {
            console.log(error);
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
        <p className="my-3 font-bold">Edit Users</p>
        <div className="bg-white rounded-lg shadow-lg p-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex">
              <div>
                <label className="text-xs">Full Name</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullname(e.target.value)}
                  className="bg-gray-200 w-full p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                  type="text"
                  name="fullname"
                />
              </div>
              <div className="ml-3">
                <label className="text-xs">NIK</label>
                <input
                  onChange={(e) => setNik(e.target.value)}
                  className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                  type="number"
                  name="nik"
                  value={nik}
                />
              </div>
            </div>
            <div>
              <label className="text-xs">Image</label>
              <input
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="file"
                name="img"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="flex">
              <div>
                <label className="text-xs">Phone</label>
                <input
                  className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                  type="text"
                  name="username"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="ml-3">
                <label className="text-xs">Birth Date</label>
                <input
                  className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                  type="date"
                  name="ttl"
                  value={birthDay}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-xs">Address</label>
              <input
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs">Level/Role</label>
              <select
                onChange={(e) => setRole(e.target.value)}
                value={role}
                name="role"
                className="bg-gray-200 w-full text-xs text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
              >
                <option>Pilih Satu</option>
                <option value="supervisor">Supervisor</option>
                <option value="sales">Sales</option>
              </select>
            </div>
            <div>
              <label className="text-xs">Password</label>
              <input
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex mt-5 justify-end">
            <Link
              to="/admin/users"
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
