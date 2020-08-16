import React, { useEffect } from "react";
import Navigation from "components/Navigation";
import Table from "components/Table";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchApotik } from "store/actions/apotik";
import axios from "configs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Apotik(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const apotik = useSelector((state) => state.apotik.apotik);
  const MySwal = withReactContent(Swal);

  const getApotik = () => {
    dispatch(fetchApotik());
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
          .delete(`/apotik/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(function (response) {
            console.log(response);
            getApotik();
            props.history.push("/admin/apotik");
          })
          .catch(function (error) {
            console.log(error.response);
          });
      }
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
      <div style={{ backgroundColor: "#F7F7F7" }} className="w-11/12 p-3 relative">
        <p className="my-3 font-bold">Apotik</p>
        <Table
          data={apotik.data}
          thead={["No", "Apotik Name", "Address", "Status", "Image", "Lat", "Long", "Action"]}
          tbody={["id", "name", "address", "status", "image", "lat", "long"]}
          editUrl={"/admin/apotik/edit"}
          deleteAction={(id) => {
            handleDelete(id);
          }}
        />
      </div>
      <Link to="/admin/apotik/add" className="absolute bottom-0 focus:outline-none right-0 mb-10 mr-10">
        <img className="w-12 rounded-full shadow-lg " src={require(`assets/icons/ic_add.svg`)} alt="add" />
      </Link>
    </div>
  );
}

export default Apotik;
