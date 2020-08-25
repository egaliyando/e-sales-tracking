import React, { useState } from "react";
import Navigation from "components/Navigation";
import axios from "configs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
const MySwal = withReactContent(Swal);

function Add(props) {
  const { id } = props.match.params;
  const [Nik, setNik] = useState("");
  const [Password, setPassword] = useState("");
  const [Role, setRole] = useState("");
  const [Address, setAddress] = useState("");
  const [Ttl, setTtl] = useState("");
  const [FullName, setFullname] = useState("");
  const [Username, setUsername] = useState("");
  const token = localStorage.token;

  const handleSubmit = () => {
    MySwal.fire({
      title: "Add User?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        axios
          .post(
            "/users",
            {
              nik: Nik,
              password: Password,
              role: Role,
              address: Address,
              ttl: Ttl,
              fullname: FullName,
              username: Username,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(function (response) {
            console.log(response);
            MySwal.fire("Add Success!", ":)", "warning", "Canceled");
            props.history.push("/admin/users");
          })
          .catch(function (error) {
            console.log(error.response);
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
        <p className="my-3 font-bold">Add Users</p>
        <div className="bg-white rounded-lg shadow-lg p-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs">Full Name</label>
              <input
                onChange={(e) => setFullname(e.target.value)}
                className="bg-gray-200 w-full p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="text"
              />
            </div>
            <div>
              <label className="text-xs">NIK</label>
              <input
                onChange={(e) => setNik(e.target.value)}
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="number"
              />
            </div>
            <div className="flex">
              <div>
                <label className="text-xs">Username</label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                  type="text"
                />
              </div>
              <div className="ml-3">
                <label className="text-xs">Birth Date</label>
                <input
                  onChange={(e) => setTtl(e.target.value)}
                  className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                  type="date"
                />
              </div>
            </div>
            <div>
              <label className="text-xs">Address</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="text"
              />
            </div>
            <div>
              <label className="text-xs">Level/Role</label>
              <select
                onChange={(e) => setRole(e.target.value)}
                className="bg-gray-200 w-full text-xs text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
              >
                <option value="supervisor">Supervisor</option>
                <option value="sales">Sales</option>
              </select>
            </div>
            <div>
              <label className="text-xs">New Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-200 w-full text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="text"
              />
            </div>
          </div>
          <div className="flex mt-5 justify-end">
            <Link
              to={`/admin/users/`}
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
