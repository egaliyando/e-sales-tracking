import React, { useEffect } from "react";
import Navigation from "components/Navigation";
import Table from "components/Table";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "store/actions/user";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "configs";

function Users(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const users = useSelector((state) => state.users.users);
  console.log(users);
  // console.log(users);
  const MySwal = withReactContent(Swal);

  const getUsers = () => {
    dispatch(fetchUsers());
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
          .delete(`/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(function (response) {
            console.log(response);
            getUsers();
          })
          .catch(function (error) {
            console.log(error.response);
          });
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (token === "") {
    return <Redirect to="/admin/auth" />;
  }
  return (
    <div className="flex">
      <Navigation />
      <div style={{ backgroundColor: "#F7F7F7" }} className="w-11/12 p-3 relative">
        <p className="my-3 font-bold">Users</p>
        {/* MODAL */}
        <Table
          data={users.user}
          thead={["ID", "Fullname", "Address", "Birth Date", "NIK", "Role", "Action"]}
          tbody={["id", "fullname", "address", "ttl", "nik", "role"]}
          editUrl={"/admin/users/edit"}
          deleteAction={(id) => {
            handleDelete(id);
          }}
        />
      </div>
      <Link to="/admin/users/add" className="absolute bottom-0 focus:outline-none right-0 mb-10 mr-10">
        <img className="w-12 rounded-full shadow-lg " src={require(`assets/icons/ic_add.svg`)} alt="add" />
      </Link>
    </div>
  );
}
export default Users;
