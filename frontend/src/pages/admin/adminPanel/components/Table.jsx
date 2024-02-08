import * as React from "react";
import { DataGrid ,GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


export default function Table({ rows, columns ,actionColumn ,deleteUser}) 
{
 
  const rowsData = rows || [];
  return (
    <div  style={{  height: '100%', width: "100%" }}>
      <DataGrid
        rows={rowsData}
        columns={columns.concat(actionColumn)}
      
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10,20]}
        checkboxSelection
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
}
