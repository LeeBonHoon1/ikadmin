import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useState, useEffect, useCallback } from "react";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import APIs from "../../lib/APIs";

export default function UserList({ data }) {
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
        let newArr = res?.filter((item, idx) => {
          return item.SORTATION !== 1;
        });
        setUser(newArr);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("잠시후에 다시 시도해주세요.");
      });
  }, []);

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
      field: "group_name",
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
            <button
              className="userListEdit"
              onClick={() => {
                history.push({
                  pathname: "/user/" + params.row.USER_IDX,
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
