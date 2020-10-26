import React, { useState, useEffect } from "react";
import Navigation from "components/Navigation";
import axios from "configs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export default function Radius() {
  const [radiusCount, setRadiusCount] = useState();
  const [radius, setradius] = useState("");
  console.log("radiusCount", radiusCount);
  const getRadius = async () => {
    const token = localStorage.token;
    try {
      const rad = await axios.get("/radius", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRadiusCount(rad.data.data[0].name);
      console.log(rad.data.data[0].name);
    } catch (error) {
      console.log(error.response);
    }
  };

  const createRadius = async () => {
    const token = localStorage.token;
    try {
      const create = await axios.post(
        "/radius",
        { name: radius },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      MySwal.fire("Radius Berhasil diganti");
      getRadius();
      console.log("create", create);
    } catch (error) {}
  };

  useEffect(() => {
    getRadius();
  });

  return (
    <div className="flex">
      <Navigation />
      <div style={{ backgroundColor: "#F7F7F7" }} className="w-11/12 p-4 relative">
        <p className="my-2 font-bold">Set Radius Trip</p>
        <p className="text-sm my-2">Radius now is : {radiusCount} M</p>
        <div className="w-full">
          <input
            onChange={(e) => setradius(e.target.value)}
            name="raius"
            value={radius}
            className="bg-gray-200 w-1/2 text-xs p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
            placeholder="Set Radius"
            type="number"
          />
        </div>
        <button onClick={createRadius} className="bg-red-500 text-white p-2 mt-3 rounded-md">
          Save
        </button>
      </div>
    </div>
  );
}
