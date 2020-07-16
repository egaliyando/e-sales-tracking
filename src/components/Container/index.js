import React from "react";

function Container(props) {
  return (
    <div style={{ backgroundColor: "#f0f0f0" }} className="max-w-md m-auto h-screen relative shadow-lg">
      {props.children}
    </div>
  );
}
export default Container;
