import React, { useEffect } from "react";
import Navigation from "components/Navigation";
import Table from "components/Table";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrip } from "store/actions/trip";

export default function Trip() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const trip = useSelector((state) => state.trip.trip);
  console.log("trip");
  console.log(trip);

  const handleDelete = () => {
    return null;
  };

  const getTrip = () => {
    dispatch(fetchTrip());
  };
  useEffect(() => {
    getTrip();
  }, []);

  if (token === "") {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div className="flex">
        <Navigation />
        <div style={{ backgroundColor: "#F7F7F7" }} className="w-11/12 p-3 relative">
          <p className="my-3 font-bold">Trip/Kujnjungan</p>
          <Table
            data={trip}
            thead={["no", "Day", "Apotik Name", "Address", "Action"]}
            tbody={["id", "address_apotik", "day", "name_apotik"]}
            editUrl={"/admin/trip/edit"}
            deleteAction={(id) => {
              handleDelete(id);
            }}
          />
        </div>
        <Link to="/admin/trip/add" className="absolute bottom-0 focus:outline-none right-0 mb-10 mr-10">
          <img className="w-12 rounded-full shadow-lg " src={require(`assets/icons/ic_add.svg`)} alt="add" />
        </Link>
      </div>
    </>
  );
}
