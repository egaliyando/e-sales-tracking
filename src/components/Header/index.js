import React, { useState } from "react";
import Popover from "components/Popover";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Toggle() {
  const [enable, setEnable] = useState(false);
  return (
    <button className="self-center focus:outline-none" onClick={() => setEnable(!enable)}>
      {enable ? (
        <img src={require(`assets/icons/header/ic_open.svg`)} alt="btn" />
      ) : (
        <img src={require(`assets/icons/header/ic_close.svg`)} alt="btn" />
      )}
    </button>
  );
}

function Header(props) {
  const hSalesWithToggle = props.hSalesWithToggle;
  const hSalesNormal = props.hSalesNormal;
  const hSupervisor = props.hSupervisor;
  if (hSalesWithToggle) {
    return (
      <div className="fixed top-0 z-50 w-full h-16 flex justify-between px-3 bg-white">
        <Toggle />
        <img className="mr-10" src={require(`assets/icons/header/icon_sales.svg`)} alt="img" />
        <div className="self-center mt-2">
          <Popover />
        </div>
      </div>
    );
  }
  if (hSalesNormal) {
    return (
      <div className="fixed top-0 z-50 w-full h-16 flex justify-between px-3 bg-white">
        <button className="focus:outline-none ml-2">
          <img src={require(`assets/icons/header/ic_back.svg`)} alt="img" />
        </button>
        <img style={{ marginLeft: "0.93rem" }} src={require(`assets/icons/header/icon_sales.svg`)} alt="img" />
        <div className="self-center mt-2">
          <Popover />
        </div>
      </div>
    );
  }
  if (hSupervisor) {
    return (
      <div className="fixed top-0 z-50 w-full h-16 flex justify-center px-3 bg-white justify-between">
        <div className="self-center ml-3 mt-2">
          <button className="focus:outline-none">
            <img src={require(`assets/icons/header/ic_back.svg`)} alt="img" />
          </button>
        </div>
        <img src={require(`assets/icons/header/icon_sales.svg`)} alt="img" />
        <div className="self-center mt-2">
          <Popover />
        </div>
      </div>
    );
  }
  return <div>Null</div>;
}

export default Header;
