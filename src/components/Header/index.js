import React, { useState } from "react";

function Header(props) {
  const [enable, setEnable] = useState(false);
  const hSales = props.hSales;
  const hSupervisor = props.hSupervisor;
  if (hSales) {
    return (
      <div className="w-full h-16 flex justify-between px-3 bg-white">
        <button className="self-center focus:outline-none" onClick={() => setEnable(!enable)}>
          {enable ? (
            <img src={require(`assets/icons/header/ic_open.svg`)} alt="btn" />
          ) : (
            <img src={require(`assets/icons/header/ic_close.svg`)} alt="btn" />
          )}
        </button>
        <img className="mr-10" src={require(`assets/icons/header/icon_sales.svg`)} alt="img" />
        <button className="self-center">
          <img src={require(`assets/icons/header/ic_more.svg`)} alt="img" />
        </button>
      </div>
    );
  }
  if (hSupervisor) {
    return (
      <div className="w-full h-16 flex justify-center px-3 bg-white justify-between">
        <div></div>
        <img src={require(`assets/icons/header/icon_sales.svg`)} alt="img" />
        <button className="self-center focus:outline-none">
          <img src={require(`assets/icons/header/ic_more.svg`)} alt="img" />
        </button>
      </div>
    );
  }
  return <div>Null</div>;
}

export default Header;
