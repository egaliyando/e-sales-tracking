import React from "react";
import { Link } from "react-router-dom";

function Auth() {
  return (
    <div className="flex h-screen w-full">
      <img className="w-2/5 m-auto" src={require(`assets/image/image_auth_adm.png`)} alt="img" />
      <div className="w-2/5 h-auto p-10 m-auto bg-gray-200 content-center justify-center flex flex-col rounded-lg">
        <input className="w-full rounded-lg mb-3 bg-white p-3" type="text" placeholder="Username" />
        <input className="w-full rounded-lg mb-3 bg-white p-3" type="password" placeholder="Password" />
        <div className="w-full">
          <Link to="/admin/dashboard">
            <button className="focus:outline-none rounded-lg bg-orange-500 text-white font-bold w-full shadow-lg p-3">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Auth;
