import "./log.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import { Typography } from "@material-ui/core";
import APIs from "../../lib/APIs";
import Loading from "../../components/loading/Loading";
import { useEffect } from "react";
import moment from "moment";

export default function Log() {
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState([]);

  useEffect(() => {
    getLogList();
  }, []);

  const getLogList = useCallback(async () => {
    setLoading(true);
    await APIs.getNoticeList()
      .then((res) => {
        let newArr = res.map((item) => {
          return item;
        });

        setLog(newArr);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("잠시후에 다시 시도해주세요.");
      });
  }, []);

  const columns = [
    { field: "NOTICE_IDX", headerName: "id", width: 90 },
    {
      field: "NAME",
      headerName: "작성자",
      width: 150,
      renderCell: (params) => {
        return <div className="logUser">{params.row.NAME}</div>;
      },
    },
    { field: "TITLE", headerName: "공지제목", width: 200 },
    {
      field: "CONTENT",
      headerName: "내용",
      width: 170,
    },
    {
      field: "GROUP_NAME",
      headerName: "그룹",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="logUser">
            {params.row.GROUP_NAME ? params.row.GROUP_NAME : "전체"}
          </div>
        );
      },
    },
    {
      field: "REG_DATE",
      headerName: "작성일",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="logUser">
            {moment(params.row.REG_DATE).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        );
      },
    },
  ];

  return (
    <>
      {!loading ? (
        <div className="log">
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            로그
          </Typography>
          <DataGrid
            rows={log}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            checkboxSelection
            getRowId={(row) => row.NOTICE_IDX}
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
