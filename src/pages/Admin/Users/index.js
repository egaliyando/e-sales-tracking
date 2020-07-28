import React from "react";
import Navigation from "components/Navigation";
import Table from "components/Table";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Users() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);

  if (token === "") {
    return <Redirect to="/" />;
  }
  return (
    <div className="flex">
      <Navigation />
      <div style={{ backgroundColor: "#F7F7F7" }} className="w-11/12 p-3 relative">
        <p className="my-3 font-bold">Users</p>
        {/* MODAL */}
        <Table
          thead={["No", "NIK", "Name", "Address", "TTL", "Password", "Level", "Action"]}
          tbody={[
            "1",
            "233434",
            "Budi",
            "BandarLampung",
            "12/12/1998",
            "*****",
            "Supervisor",
            <div className="flex">
              <Link to="/admin/users/edit" className="focus:outline-none w-5">
                <img src={require(`assets/icons/ic_pencil.svg`)} alt="add" />
              </Link>
              <button className="mx-5 focus:outline-none w-4" onClick={() => alert("Yakin Menghapus?")}>
                <img src={require(`assets/icons/ic_trash.svg`)} alt="add" />
              </button>
            </div>,
          ]}
        />
      </div>
      <Link to="/admin/users/add" className="absolute bottom-0 focus:outline-none right-0 mb-10 mr-10">
        <img className="w-12 rounded-full shadow-lg " src={require(`assets/icons/ic_add.svg`)} alt="add" />
      </Link>
    </div>
  );
}
export default Users;
