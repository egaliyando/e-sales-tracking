import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="flex content-center flex-wrap shadow-lg h-screen w-1/12">
      <div className="grid-cols-1 grid m-auto">
        <Link to="/admin/dashboard" className="mb-5 focus:outline-none">
          <img
            className="m-auto"
            src={require(`assets/icons/ic_dashboard.svg`)}
            alt="ic"
          />
          <p className="text-gray-700 text-center text-xs mt-2">Dashboard</p>
        </Link>
        <Link to="/admin/product" className="mb-5 focus:outline-none">
          <img
            className="m-auto"
            src={require(`assets/icons/ic_product.svg`)}
            alt="ic"
          />
          <p className="text-gray-700 text-center text-xs mt-2">Product</p>
        </Link>
        <Link to="/admin/users" className="mb-5 focus:outline-none">
          <img
            className="m-auto"
            src={require(`assets/icons/ic_user.svg`)}
            alt="ic"
          />
          <p className="text-gray-700 text-center text-xs mt-2">User</p>
        </Link>
        <Link to="/admin/apotik" className="mb-5 focus:outline-none">
          <img
            className="m-auto"
            src={require(`assets/icons/ic_apotik.svg`)}
            alt="ic"
          />
          <p className="text-gray-700 text-center text-xs mt-2">Apotik</p>
        </Link>
        {/* <Link to="/admin/chat" className="mb-5 focus:outline-none">
          <img className="m-auto" src={require(`assets/icons/ic_chat.svg`)} alt="ic" />
          <p className="text-gray-700 text-center text-xs mt-2">Chat</p>
        </Link> */}
        <Link to="/admin/order" className="mb-5 focus:outline-none">
          <img
            className="m-auto"
            src={require(`assets/icons/ic_transaction.svg`)}
            alt="ic"
          />
          <p className="text-gray-700 text-center text-xs mt-2">Order</p>
        </Link>
        <Link to="/admin/logout" className="mb-5 focus:outline-none">
          <img
            className="m-auto"
            src={require(`assets/icons/ic_transaction.svg`)}
            alt="ic"
          />
          <p className="text-gray-700 text-center text-xs mt-2">Logout</p>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
