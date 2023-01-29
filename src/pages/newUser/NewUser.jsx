import "./newUser.css";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Typography } from "@material-ui/core";
import APIs from "../../lib/APIs";

export default function NewUser() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = useCallback(async () => {
    setLoading(true);
    await APIs.getUserList()
      .then((res) => {
        let newArr = res.filter((item) => {
          return item.ADMISSION === "0" && item.SORTATION !== 1;
        });
        setUser(newArr);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("잠시후에 다시 시도해주세요.");
      });
  }, []);

  const handleDelete = (id) => {
    alert("delete");
  };

  const handleConfirm = () => {
    alert("confirm");
  };

  const columns = [
    { field: "USER_IDX", headerName: "ID", width: 90 },
    {
      field: "NAME",
      headerName: "이름",
      width: 150,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.NAME}</div>;
      },
    },
    { field: "EMAIL", headerName: "이메일", width: 200 },
    {
      field: "NUMBER",
      headerName: "연락처",
      width: 170,
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
    <>
      {!loading ? (
        <div className="userList">
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            회원승인
          </Typography>
          <DataGrid
            rows={user}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            checkboxSelection
            getRowId={(row) => row.USER_IDX}
          />
        </div>
      ) : null}
    </>
  );
}
