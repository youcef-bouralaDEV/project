import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { useGlobelContext } from "../../../context/Context";
import Header from "./components/Header";
import Table from "./components/Table";

export default function Client() {
  const { getClients, clients } = useGlobelContext();
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };

  useEffect(() => {
    getClients();
  }, []);

  console.log(clients);
  const deleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    try {
      axios.delete(`deleteClient/${id}`);
    } catch (err) {
      console.log(err);
    }
    getClients();
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Pag" title="Custom" />
   
        <Table loading={clients ? clients.length : 0} rows={clients}  />

   
    </div>
  );
}
