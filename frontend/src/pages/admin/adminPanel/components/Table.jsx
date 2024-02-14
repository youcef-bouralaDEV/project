import * as React from "react";
import { DataGrid ,GridToolbar } from "@mui/x-data-grid";



export default function Table({ rows, columns ,actionColumn ,deleteUser}) 
{
 
  const rowsData = rows || [];
  return (
    <div  className="border-1  border-gray-100 rounded">
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
