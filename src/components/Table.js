import React from "react";
import Thead from "./Thead";
import Tbody from "./Tbody";

function Table({ thead, data, tbody, editUrl, deleteAction, handlePageClick, pages }) {
  return (
    <table className="table-fixed w-full">
      <Thead text={thead} />
      <Tbody data={data} display={tbody} editUrl={editUrl} deleteAction={deleteAction} />
    </table>
  );
}

export default Table;
