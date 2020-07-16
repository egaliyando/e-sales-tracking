import React from "react";

function Container(props) {
  return (
    <div style={{ backgroundColor: "#F7F7F7" }} className="max-w-md m-auto h-screen shadow-lg">
      {props.children}
    </div>
  );
}
export default Container;
