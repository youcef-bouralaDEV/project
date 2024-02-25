import { Link } from "react-router-dom";
import axios from "../../../../axios";
import Table from "../components/Table";
import { MdDelete } from "react-icons/md";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function MarkView() {
  const [loading, setLoading] = useState(true);
  const [marks, setMarks] = useState([]);

  const columns = [
    {
      field: "icon",
      headerName: "Image",
      width: 200,
      renderCell: (params) => (
        <div>
          <img
            className="w-10 h-10 rounded-full bg-cover"
            src={params.row.icon || "/src/assets/skills-01.jpg"}
            alt=""
          />
        </div>
      ),
    },

    {
      field: "name",
      headerName: "Nom",
      width: 300,
    },

    
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
    width: 300,
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
    axios.get(`getMarks`).then((res) => {
      if (res.data.status === 200) {
       
        // console.log(res.data);
        setMarks(res.data.marks);
        setLoading(false);
      } else if (res.data.status === 400) {
        console.log("Warning", res.data.message, " ");
      } else if (res.data.status === 404) {
        console.log("Warning", res.data.message, "error");
      }
    });
  }, []);
console.log(marks);
  return (
    <div className="max-w-[90%] p-6  m-auto ">
      <Header category="Page" title="Mark" />
      <div className="relative   my-5   sm:rounded-lg ">
        <Table
          loading={marks ? marks.length : 0}
          rows={marks}
          columns={columns}
          actionColumn={actionColumn}
        />
      </div>
    </div>
  );
}
