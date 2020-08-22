import React, { useState, useEffect } from "react";
import axios from "configs";

import Navigation from "components/Navigation";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Add(props) {
  const token = useSelector((state) => state.users.token);
  const MySwal = withReactContent(Swal);

  const [day, setDay] = useState();
  const [apotik, setApotik] = useState([]);
  const [apotik_id, setApotikId] = useState();

  console.log("apotik");
  console.log(apotik_id);
  console.log("day");
  console.log(day);

  //CHANGE DAY
  const handleDay = (e) => {
    setDay(e.target.value);
  };
  //CHANGE OPTION APOTIK
  const handleChange = (e) => {
    setApotikId(e.target.value);
  };

  //HANDLE SUBMIT TRIP
  const handleSubmit = () => {
    MySwal.fire({
      title: "Add Trip?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        MySwal.fire("Add Success!", ":)", "warning", "Canceled");
        axios
          .post(
            "/trip",
            {
              apotik_id: apotik_id,
              day: day,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(function (response) {
            console.log(response);
            props.history.push("/admin/trip");
          })
          .catch(function (error) {
            console.log(error.response.data.error);
            let err = [];
            for (let i = 0; i < error.response.data.error.length; i++) {
              err.push(error.response.data.error[i].param);
            }
            alert(err);
          });
      }
    });
  };

  const getApotik = () => {
    const token = localStorage.token;
    axios
      .get(`/apotik`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setApotik(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getApotik();
  }, []);

  if (token === "") {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex">
      <Navigation />
      <div className="w-11/12 p-3">
        <p className="my-3 ml-5 font-bold">Add Trip/Kunjungan</p>
        <div className="bg-white rounded-lg shadow-lg p-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="apotik" className="text-xs">
                Apotik
              </label>
              <select
                name="apotik_id"
                value={apotik_id}
                onChange={handleChange}
                defaultValue="Pilih Apotik"
                className="bg-gray-200 w-full p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
              >
                {/* <option selected>Pilih Apotik</option> */}
                {apotik.map((data, i) => {
                  return (
                    <option key={i} value={data.id}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="text-xs">Day</label>
              <input
                onChange={handleDay}
                className="bg-gray-200 w-full p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                type="date"
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
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
