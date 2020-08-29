import React, { useEffect } from "react";
import Navigation from "components/Navigation";
import Table from "components/Table";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrip } from "store/actions/trip";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "configs";

export default function Trip(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const trip = useSelector((state) => state.trip.trip);
  const MySwal = withReactContent(Swal);
  console.log("trip");
  console.log(trip);

  const getTrip = () => {
    dispatch(fetchTrip());
  };
  const handleDelete = (id) => {
    const token = localStorage.token;
    MySwal.fire({
      title: "Delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        MySwal.fire("Delete Success!", "", "Canceled");
        axios
          .delete(`/trip/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(function (response) {
            // console.log(response);
            getTrip();
            props.history.push("/admin/trip");
          })
          .catch(function (error) {
            console.log(error.response);
          });
      }
    });
  };
  useEffect(() => {
    getTrip();
  }, []);

  if (token === "") {
    return <Redirect to="/admin/auth" />;
  }
  return (
    <>
      <div className="flex">
        <Navigation />
        <div style={{ backgroundColor: "#F7F7F7" }} className="w-11/12 p-3 relative">
          <p className="my-3 font-bold">Trip</p>
          <Table
            data={trip}
            thead={["ID", "Trip Name", "Address", "Action"]}
            tbody={["id", "name_apotik", "address_apotik"]}
            editUrl={"/admin/trip/edit"}
            deleteAction={(id) => {
              handleDelete(id);
            }}
            customAction={"/admin/trip/detail"}
          />
        </div>
        <Link to="/admin/trip/add" className="absolute bottom-0 focus:outline-none right-0 mb-10 mr-10">
          <img className="w-12 rounded-full shadow-lg " src={require(`assets/icons/ic_add.svg`)} alt="add" />
        </Link>
      </div>
    </>
  );
}
