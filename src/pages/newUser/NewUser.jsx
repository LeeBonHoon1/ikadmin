import "./newUser.css";
import { DataGrid } from "@material-ui/data-grid";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Typography } from "@material-ui/core";

export default function NewUser() {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    alert("delete");
    // setData(data.filter((item) => item.id !== id));
  };

  const handleConfirm = () => {
    alert("confirm");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "이름",
      width: 150,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.username}</div>;
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
            <button className="userListEdit" onClick={handleConfirm}>
              승인
            </button>
            <button className="userListDelete" onClick={handleDelete}>
              거절
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <Typography variant="h4" style={{ marginBottom: "10px" }}>
        회원승인
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
