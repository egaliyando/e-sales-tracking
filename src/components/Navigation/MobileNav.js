import React from "react";
import { Link } from "react-router-dom";

function Sales() {
  return (
    <div className="w-full h-16 shadow-md bg-white grid grid-cols-4 gap-3">
      <Link className="self-center" to="/sales/dashboard">
        <img className="m-auto" src={require(`assets/icons/nav/ic_home.svg`)} alt="menu" />
      </Link>
      <Link className="self-center" to="/sales/visit">
        <img className="m-auto" src={require(`assets/icons/nav/ic_map.svg`)} alt="menu" />
      </Link>
      <Link className="self-center" to="/sales/history">
        <img className="m-auto" src={require(`assets/icons/nav/ic_history.svg`)} alt="menu" />
      </Link>
      <Link className="self-center" to="/sales/profil">
        <img className="m-auto" src={require(`assets/icons/nav/ic_user.svg`)} alt="menu" />
      </Link>
    </div>
  );
}

function Supervisor() {
  return <div>Supervisor</div>;
}

function MobileNav(props) {
  const isSales = props.isSales;
  const isSupervisor = props.isSupervisor;
  if (isSales) {
    return <Sales />;
  }
  if (isSupervisor) {
    return <Supervisor />;
  }
  return <div>Null</div>;
}
export default MobileNav;
