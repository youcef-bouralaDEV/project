import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import Table from "../../admin/adminPanel/components/Table";
import Header from "../../admin/adminPanel/components/Header";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

export default function MyOrder() {
  const [orders, setOrders] = useState([]);

  const columns = [
    {
      field: "order_nmbr",
      headerName: "Commande",
      width: 180,
    },
    {
      field: "created_at",
      headerName: "Date de commande",
      width: 180,
    },
    { field: "nombre_articles", headerName: "Nombre d'article", width: 150 },
    { field: "total_ttc", headerName: "Montant", width: 150 },

    {
      field: "orderState",
      headerName: "état",
      width: 150,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor:
              params.row.orderState == "En attente" ? "#8bc34a" : "#FF5252",
            color: "#FFF",
            padding: "3px 5px",
            borderRadius: "4px",
            width: "80px",
          }}
        >
          {params.row.orderState}
        </div>
      ),
    },
  ];
  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="flex gap-3 ">
          <Link to={"/client/order/" + params.row.id}>
            <FaRegEdit color="blue" size={"1.2rem"} />
          </Link>
        </div>
      );
    },
  };
  //
  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    try {
      const response = await axios.get("/getorders");
      // console.log(response.data); 
      setOrders(response.data.orders);
    } catch (error) {
      console.error(error);
    }
  };
  

  
  return (
    <div className="w-[90%] m-auto px-6 ">
      <Header category="Page" title="Order" />

      <Table rows={orders} columns={columns} actionColumn={actionColumn} />
    </div>
  );
}
