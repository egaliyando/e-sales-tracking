import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="flex content-center flex-wrap shadow-lg h-full w-1/12">
      <div className="grid-cols-1 grid m-auto">
        <Link to="/admin/dashboard" style={{ marginTop: 20 }} className="mb-5 focus:outline-none">
          <img className="m-auto" src={require(`assets/icons/ic_dashboard.svg`)} alt="ic" />
          <p className="text-gray-700 text-center text-xs mt-2">Dashboard</p>
        </Link>
        <Link to="/admin/product" className="mb-5 focus:outline-none">
          <img className="m-auto" src={require(`assets/icons/ic_product.svg`)} alt="ic" />
          <p className="text-gray-700 text-center text-xs mt-2">Product</p>
        </Link>
        <Link to="/admin/users" className="mb-5 focus:outline-none">
          <img className="m-auto" src={require(`assets/icons/ic_user.svg`)} alt="ic" />
          <p className="text-gray-700 text-center text-xs mt-2">User</p>
        </Link>
        <Link to="/admin/apotik" className="mb-5 focus:outline-none">
          <img className="m-auto" src={require(`assets/icons/ic_apotik.svg`)} alt="ic" />
          <p className="text-gray-700 text-center text-xs mt-2">Apotek/RS</p>
        </Link>
        <Link to="/admin/trip" className="mb-5 focus:outline-none">
          <img className="m-auto" src={require(`assets/icons/ic_visit.svg`)} alt="ic" />
          <p className="text-gray-700 text-center text-xs mt-2">Trip</p>
        </Link>
        <Link to="/admin/radius" className="mb-5 focus:outline-none">
          <svg className="m-auto" xmlns="http://www.w3.org/2000/svg" width="27" height="36" viewBox="0 0 27 36">
            <path
              id="Icon_awesome-map-marker-alt"
              data-name="Icon awesome-map-marker-alt"
              d="M12.113,35.274C1.9,20.463,0,18.943,0,13.5a13.5,13.5,0,0,1,27,0c0,5.443-1.9,6.963-12.113,21.774a1.688,1.688,0,0,1-2.775,0ZM13.5,19.125A5.625,5.625,0,1,0,7.875,13.5,5.625,5.625,0,0,0,13.5,19.125Z"
              fill="#9d9d9d"
            />
          </svg>

          <p className="text-gray-700 text-center text-xs mt-2">Radius</p>
        </Link>
        <Link to="/admin/order" className="mb-5 focus:outline-none">
          <img className="m-auto" src={require(`assets/icons/ic_transaction.svg`)} alt="ic" />
          <p className="text-gray-700 text-center text-xs mt-2">Order</p>
        </Link>
        <Link to="/admin/logout" className="mb-5 focus:outline-none">
          <img className="m-auto" src={require(`assets/icons/ic_logout.svg`)} alt="ic" />
          <p className="text-gray-700 text-center text-xs mt-2">Logout</p>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
