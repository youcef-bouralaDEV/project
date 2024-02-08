import axios from "../../../../axios";
import { useEffect } from "react";
import { useGlobelContext } from "../../../../context/Context";
import Header from "../components/Header";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Client() {
  const { getClients, clients } = useGlobelContext();

  const columns = [
    {
      field: "wilaya",
      headerName: "Région",
      width: 160,
    },
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "User",
      width: 180,
      renderCell: (params) => {
        return (
          <div>
            <Link
              className="flex  items-center gap-4"
              to={`clientDetailsView/${params.row.id}`}
            >
              <img
                className="w-10 h-10 rounded-full bg-cover"
                src={params.row.img || "/src/assets/skills-01.jpg"}
                alt=""
              />

              {params.row.name}
            </Link>
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 130 },
    {
      field: "etat",
      headerName: "État",
      width: 90,
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
          <Link to={'/admin/client/'+ params.row.id}>
            <FaRegEdit color="green" size={'1.2rem'}/>
          </Link>
          <button onClick={()=>deleteUser(params.rows.id)} >
            <MdDelete color="red" size={'1.2rem'}/>
          </button>
        </div>
      );
    },
  };

  useEffect(() => {
    getClients();
  }, []);

  // console.log(clients);
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
    <div className="px-5">
      <Header category="Page" title="Client" />
      <div className=" mt-5 md:mx-10 p-3 md:p-7 bg-[#fff] rounded-3xl">
        <div className="w-full text-center md:text-right mb-1 md:mb-5">
          <Link
            to={"create"}
            className="inline-flex items-center justify-center gap-2 rounded border border-orange-500 mt-1 text-sm py-1.5 text-center font-normal text-white bg-orange-500 hover:bg-opacity-90 px-3 sm:px-6 md:px-6 lg:px-8 xl:px-6 hover:shadow-[0_3px_15px_rgba(0,0,0,0.25)]"
          >
            <FiPlus className="bg-white rounded-full text-orange-500" />
            Nouveau Client
          </Link>
        </div>

        <Table
          loading={clients ? clients.length : 0}
          rows={clients}
          columns={columns}
          actionColumn={actionColumn}
          deleteUser={deleteUser}
        />
      </div>
    </div>
  );
}
