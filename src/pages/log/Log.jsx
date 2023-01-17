import "./log.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Typography } from "@material-ui/core";

export default function Log() {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "이름",
      width: 150,
      renderCell: (params) => {
        return <div className="logUser">{params.row.username}</div>;
      },
    },
    { field: "email", headerName: "이메일", width: 200 },
    {
      field: "number",
      headerName: "연락처",
      width: 170,
    },
    {
      field: "group",
      headerName: "그룹",
      width: 150,
    },
    {
      field: "action",
      headerName: "수정",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="logEdit">수정</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="log">
      <Typography variant="h4" style={{ marginBottom: "10px" }}>
        회원
      </Typography>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
