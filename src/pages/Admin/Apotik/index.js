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
  // deklarasi dispatch redux
  const dispatch = useDispatch();
  //deklarasi untuk token
  const token = useSelector((state) => state.users.token);
  //deklarasi selector untuk get data apotik menggunakan redux
  const apotik = useSelector((state) => state.apotik.apotik);
  // deklarasi swetalert
  const MySwal = withReactContent(Swal);
  //deklarasi fetching data apotik dari dispatch
  const getApotik = () => {
    //fetchApotik telah dideklarasikan di redux state
    dispatch(fetchApotik());
  };
  //function untuk action delete data apotik
  const handleDelete = (id) => {
    //deklarasi token agar dapat akses authorization dari server
    const token = localStorage.token;
    //penggunaan sweetalert ketika delete data
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
        //function method delete axios
        axios
          .delete(`/apotik/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(function (response) {
            //setelah didelete data langsung di callback
            getApotik();
            //lalu di arahkan ke menu apotik
            props.history.push("/admin/apotik");
          })
          .catch(function (error) {
            //untuk menangkap error apabila data tidak terakses
            console.log(error.response);
          });
      }
    });
  };
  //hooks useeefect pengganti componentdidmount pada react
  useEffect(() => {
    //menjalankan get apotik
    getApotik();
  }, []); //berikan array kosong agar data tidak looping terus
  //session token ketika user login gagal/belum login
  if (token === "") {
    return <Redirect to="/admin/auth" />;
  }
  return (
    <div className="flex">
      <Navigation />
      <div style={{ backgroundColor: "#F7F7F7" }} className="w-11/12 p-3 relative">
        <p className="my-3 font-bold">Apotek / RS</p>
        <Table
          data={apotik.data}
          thead={["ID", "Apotek/RS Name", "Address", "Lat", "Long", "Image", "Action"]}
          tbody={["id", "name", "address", "image", "lat", "long"]}
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
