import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  {
    field: 'adresse',
    headerName: 'Adresse',
    width: 90,
  },
  {
    field: 'willaya',
    headerName: 'Willaya',
    width: 160,
  },
];

export default function Table({rows}) {
  const rowsData = rows || [];
  return (
    <div style={{ height: 160, width: '100%' }}>
      <DataGrid 
        rows={rowsData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
