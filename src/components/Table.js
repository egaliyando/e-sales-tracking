import React from "react";
import Thead from "./Thead";
import Tbody from "./Tbody";

function Table({ thead, data, tbody, editUrl, deleteAction, customAction }) {
  return (
    <div style={{ height: "90vh" }} className="overflow-scroll">
      <table className="table-fixed w-full">
        <Thead text={thead} />
        <Tbody data={data} display={tbody} editUrl={editUrl} customAction={customAction} deleteAction={deleteAction} />
      </table>
    </div>
  );
}

export default Table;
