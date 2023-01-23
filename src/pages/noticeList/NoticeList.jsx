import { DataGrid } from "@material-ui/data-grid";
import { useState, useEffect, useCallback } from "react";
import { Typography } from "@material-ui/core";

import APIs from "../../lib/APIs";
import moment from "moment";

export default function UserList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNoticeList();
  }, []);

  const getNoticeList = useCallback(async () => {
    setLoading(true);
    await APIs.getNoticeList()
      .then((res) => {
        let newArr = res.map((item) => {
          return item;
        });
        setData(newArr);
        setLoading(false);
      })
      .catch((err) => {
        alert("잠시후에 다시 시도해주세요.");
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: "NOTICE_IDX", headerName: "ID", width: 90 },
    {
      field: "NAME",
      headerName: "작성자",
      width: 150,
      renderCell: (params) => {
        return <div className="userListUser">{params?.row?.NAME}</div>;
      },
    },
    { field: "TITLE", headerName: "타이틀", width: 200 },
    {
      field: "REG_DATE",
      headerName: "작성일",
      width: 170,
      renderCell: (params) => {
        return (
          <div>
            {moment(params?.row?.REG_DATE).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        );
      },
    },
    {
      field: "CONTENT",
      headerName: "내용",
      width: 300,
    },
  ];

  return (
    <>
      {!loading ? (
        <div className="userList">
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            공지사항
          </Typography>
          <DataGrid
            rows={data}
            disableSelectionOnClick
            columns={columns?.map((item) => ({
              ...item,
            }))}
            pageSize={10}
            checkboxSelection
            getRowId={(row) => row?.NOTICE_IDX}
          />
        </div>
      ) : null}
    </>
  );
}
