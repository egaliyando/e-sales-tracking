import React, { useState, useEffect } from "react";
import axios from "configs";
import Navigation from "components/Navigation";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";

import withReactContent from "sweetalert2-react-content";

export default function Edit(props) {
  const today = new Date();
  const MySwal = withReactContent(Swal);
  const token = localStorage.token;
  const [day, setDay] = useState("");
  const [apotik_id, setApotikId] = useState([]);
  const [apotikName, setApotikName] = useState([]);

  console.log("apotik id");
  console.log(apotik_id);
  console.log("day");
  console.log(day);
  // console.log("name");
  // console.log(apotikName);

  //CHANGE DAY
  const handleDay = (date) => {
    setDay(moment(date).format("LLLL"));
  };
  //CHANGE OPTION APOTIK
  const handleChange = (e) => {
    setApotikId(e.target.value);
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
        setApotikName(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //SINGLE TRIP
  const getTrip = () => {
    const { id } = props.match.params;
    const token = localStorage.token;

    axios
      .get(`/trip/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setApotikId(res.data.data.apotik_id);
        // setDay(moment(res.data.data.day));
        console.log("res.data.data.day");
        setDay(moment(res.data.data.day).format("LLLL"));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //HANDLE SUBMIT
  const handleSubmit = () => {
    const { id } = props.match.params;
    const token = localStorage.token;
    MySwal.fire({
      title: "Edit Apotik?",
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
            `/trip/${id}`,
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

  useEffect(() => {
    getTrip();
    getApotik();
  }, []);

  if (token === "") {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex">
      <Navigation />
      <div className="w-11/12 p-3">
        <p className="my-3 ml-5 font-bold">Edit Trip</p>
        <div className="bg-white rounded-lg shadow-lg p-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs">Apotek</label>
              <select
                name="apotik_id"
                value={apotik_id}
                onChange={handleChange}
                className="bg-gray-200 w-full p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
              >
                {/* <option selected>Pilih Apotik</option> */}
                {apotikName.map((data, i) => {
                  return (
                    <option key={i} value={data.id}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="text-xs">Day : {day}</label> <br />
              <DatePicker
                // selected={day}
                className="bg-gray-200 w-full self-center p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
                onChange={handleDay}
                minDate={moment().toDate()}
                placeholderText="Select a day"
              />
            </div>
          </div>
          <div className="flex mt-5 justify-end">
            <Link
              to="/admin/trip"
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
