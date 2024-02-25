import { Link } from "react-router-dom";
import axios from "../../../../axios";
import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { MdDelete } from "react-icons/md";
import Header from "../components/Header";

export default function ViewCategory() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const columns = [
    {
      field: "icon",
      headerName: "Image",
      width: 80,
      renderCell: (params) => (
      <div>
      <img
        className="w-10 h-10 rounded-full bg-cover"
        src={params.row.icon || "/src/assets/skills-01.jpg"}
        alt=""
      />
    </div>
      )
    },

    {
      field: "name",
      headerName: "Nom",
      width: 200,
    },

    { field: "categorie_mere", headerName: "Catégorie mére", width: 130 },
    {
      field: "etat",
      headerName: "État",
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor:
              params.row.etat === "Active" ? "#8bc34a" : "#FF5252",
            color: "#FFF", // White text color
            padding: "3px 5px",
            borderRadius: "4px",
            width: "58px",
          }}
        >
          {params.row.etat}
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
          <button onClick={() => deleteProduct(params.row.id)}>
            <MdDelete color="red" size={"1.2rem"} />
          </button>
        </div>
      );
    },
  };

  useEffect(() => {
    axios.get(`getCategories`).then((res) => {
      if (res.data.status === 200) {
        console.log(res.data.categories);
        setCategories(res.data.categories);
        setLoading(false);
      } else if (res.data.status === 400) {
        console.log("Warning", res.data.message, " ");
      } else if (res.data.status === 404) {
        console.log("Warning", res.data.message, "error");
      }
    });
  }, []);

  return (
    <div className="max-w-[90%] p-6  m-auto ">
      <Header category="Page" title="Catégory" />
    <div className="relative   my-5   sm:rounded-lg ">
      <Table
        loading={categories ? categories.length : 0}
        rows={categories}
        columns={columns}
        actionColumn={actionColumn}
      />

      
    </div>
    </div>
  );
}
