import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { userRows } from "../../dummyData";
import { useState } from "react";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import APIs from "../../lib/APIs";
import { useEffect, useCallback } from "react";

export default function UserList() {
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = useCallback(async () => {
    setLoading(true);
    await APIs.getUserList()
      .then((res) => {
        let newArr = res.map((item, idx) => {
          return item;
        });
        setUser(newArr);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("잠시후에 다시 시도해주세요.");
      });
  }, []);
  // ADMISSION: "0"
  // EMAIL: "string2"
  // NAME: "string3"
  // NUMBER: "string2"
  // SORTATION: 0
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
      field: "SORTATION",
      headerName: "구분",
      width: 150,
    },
    {
      field: "action",
      headerName: "수정",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              className="userListEdit"
              onClick={() => {
                history.push({
                  pathname: "/user/" + params.row.id,
                  state: {
                    userInfo: params.row,
                  },
                });
              }}
            >
              수정
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
            회원
          </Typography>
          <DataGrid
            rows={user}
            disableSelectionOnClick
            columns={columns.map((item) => ({
              ...item,
            }))}
            pageSize={10}
            checkboxSelection
            getRowId={(row) => row.USER_IDX}
          />
        </div>
      ) : null}
    </>
  );
}
