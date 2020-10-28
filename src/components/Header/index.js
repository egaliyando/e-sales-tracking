import React, { useState, useEffect } from "react";
import Popover from "components/Popover";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "configs";
import { useHistory } from "react-router-dom";

function Toggle() {
  const MySwal = withReactContent(Swal);
  //deklarasi toggle
  const [enable, setEnable] = useState("");

  function handleOpen() {
    const token = localStorage.token;
    const sales_id = localStorage.sales_id;
    return MySwal.fire({
      title: "Open Day?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        axios
          .put(`/sales/change-status/${sales_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        MySwal.fire("Open Day!", "Welcome!", "Canceled");
        setEnable(!enable);
        window.location.reload(true);
      }
    });
  }
  function handleClose() {
    const token = localStorage.token;
    const sales_id = localStorage.sales_id;
    return MySwal.fire({
      title: "Close Day?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        axios
          .put(`/sales/change-status/${sales_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        MySwal.fire("Close Day!", "Bye-bye!", "Canceled");
        setEnable(!enable);
        window.location.reload(true);
      }
    });
  }

  const getUser = () => {
    const token = localStorage.token;
    const sales_id = localStorage.sales_id;
    axios
      .get(`/users/${sales_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setEnable(res.data.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="self-center mt-2">
      {enable === "Close" ? (
        <button className="focus:outline-none" onClick={handleOpen}>
          <img src={require(`assets/icons/header/ic_close.svg`)} alt="btn" />
        </button>
      ) : (
        <button className="focus:outline-none" onClick={handleClose}>
          <img src={require(`assets/icons/header/ic_open.svg`)} alt="btn" />
        </button>
      )}
    </div>
  );
}

function Header(props) {
  const hSalesWithToggle = props.hSalesWithToggle;
  const hSalesNormal = props.hSalesNormal;
  const hSupervisor = props.hSupervisor;
  const history = useHistory();
  if (hSalesWithToggle) {
    return (
      <div
        style={{ width: "-webkit-fill-available" }}
        className="fixed top-0 z-50 max-w-md h-16 flex justify-between px-3 bg-white"
      >
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
      <div
        style={{ width: "-webkit-fill-available" }}
        className="fixed top-0 z-50 max-w-md h-16 flex justify-between px-3 bg-white"
      >
        <button onClick={() => history.goBack()} className="focus:outline-none ml-2">
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
      <div
        style={{ width: "-webkit-fill-available" }}
        className="fixed top-0 z-50 max-w-md h-16 flex justify-center px-3 bg-white justify-between"
      >
        <div className="self-center ml-3 mt-2">
          <button onClick={() => history.goBack()} className="focus:outline-none">
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
