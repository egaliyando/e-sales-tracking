import React from "react";
import Thead from "./Thead";
import Tbody from "./Tbody";

function Table({ thead, tbody }) {
  return (
    <table className="table-fixed w-full">
      <Thead text={thead} />
      <Tbody text_body={tbody} />
    </table>
  );
}

export default Table;
