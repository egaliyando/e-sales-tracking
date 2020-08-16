import React from "react";

const LogoutClient = (props) => {
  localStorage.removeItem("token");
  console.log(props);
  //   localStorage.removeItem("role");
  return (window.location = "/");
};

export default LogoutClient;
