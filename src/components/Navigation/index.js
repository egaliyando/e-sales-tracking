import React from "react";

function Navigation() {
  return (
    <div className="flex content-center flex-wrap shadow-lg h-screen w-1/12">
      <div className="grid-cols-1 grid m-auto">
        <button className="mb-5 focus:outline-none">
          <img className="m-auto" src={require(`assets/icons/ic_dashboard.svg`)} alt="ic" />
          <p className=" text-gray-700 text-center text-xs mt-2">Dashboard</p>
        </button>
        <button className="mb-5 focus:outline-none">
          <img className="m-auto" src={require(`assets/icons/ic_product.svg`)} alt="ic" />
          <p className=" text-gray-700 text-center text-xs mt-2">Product</p>
        </button>
        <button className="mb-5 focus:outline-none">
          <img className="m-auto" src={require(`assets/icons/ic_user.svg`)} alt="ic" />
          <p className=" text-gray-700 text-center text-xs mt-2">User</p>
        </button>
        <button className="mb-5 focus:outline-none">
          <img className="m-auto" src={require(`assets/icons/ic_visit.svg`)} alt="ic" />
          <p className=" text-gray-700 text-center text-xs mt-2">Kunjungan</p>
        </button>
        <button className="mb-5 focus:outline-none">
          <img className="m-auto" src={require(`assets/icons/ic_chat.svg`)} alt="ic" />
          <p className=" text-gray-700 text-center text-xs mt-2">Chat</p>
        </button>
        <button className="mb-5 focus:outline-none">
          <img className="m-auto" src={require(`assets/icons/ic_transaction.svg`)} alt="ic" />
          <p className=" text-gray-700 text-center text-xs mt-2">Transaksi</p>
        </button>
      </div>
    </div>
  );
}

export default Navigation;
