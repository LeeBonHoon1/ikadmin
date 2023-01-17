import "./group.css";
import { DataGrid } from "@material-ui/data-grid";
import { groupRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Typography } from "@material-ui/core";

export default function Group() {
  const [data, setData] = useState(groupRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "group",
      headerName: "그룹",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.group}</div>;
      },
    },
    { field: "groupMemberNumber", headerName: "그룹원", width: 200 },
    {
      field: "groupHeader",
      headerName: "그룹장",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: `/product/${params.row.id}`,
                state: {
                  userInfo: params.row,
                },
              }}
            >
              <button className="productListEdit">상세</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <Typography variant="h4" style={{ marginBottom: "10px" }}>
        그룹
      </Typography>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
