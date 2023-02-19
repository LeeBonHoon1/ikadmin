import "./group.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import APIs from "../../lib/APIs";
import { Typography, Modal, Box, TextField, Button } from "@material-ui/core";
import AddStudent from "./AddStudent";
import { useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";

export default function Group() {
  const { data } = useSelector((store) => store.admission);
  const { userIdx } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");

  useEffect(() => {
    getGroupList();
  }, []);

  const groupNameHandler = (e) => {
    setGroupName(e.target.value);
  };

  const groupDescHandler = (e) => {
    setGroupDesc(e.target.value);
  };

  const getGroupList = useCallback(async () => {
    setLoading(true);
    await APIs.getGroupList()
      .then((res) => {
        let newArr = res.map((item) => {
          return item;
        });

        setGroup(newArr);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("잠시후에 다시 시도해주세요.");
      });
  }, []);

  const makeGroup = useCallback(async () => {
    setLoading(true);
    const param = {
      teacherIdx: userIdx,
      comment: groupDesc,
      groupName,
    };

    await APIs.makeGroup(param)
      .then((res) => {
        alert("그룹이 생성되었습니다.");
        setOpen(false);
        setLoading(false);
      })
      .catch((err) => {
        alert("잠시후 다시 시도해주세요.");
        setLoading(false);
        setOpen(false);
      });
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    backgroundColor: "white",
    border: "1px solid #fff",
    boxShadow: 24,
    borderRadius: "5px",
    p: 4,
  };

  const columns = [
    { field: "GROUP_IDX", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "그룹",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.name}</div>;
      },
    },
    { field: "student_count", headerName: "그룹원", width: 200 },
    { field: "COMMENT", headerName: "그룹설명", width: 200 },
    {
      field: "teacher_name",
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
                pathname: `/product/${params.row.GROUP_IDX}`,
                state: {
                  userInfo: params.row,
                },
              }}
            >
              <button className="productListEdit">상세보기</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <>
      {!loading ? (
        <div className="productList">
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            그룹
          </Typography>
          <button className="createGroup" onClick={handleOpen}>
            그룹생성
          </button>
          <DataGrid
            rows={group}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            getRowId={(row) => row.GROUP_IDX}
          />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box style={style}>
              <Box style={{ padding: "30px" }}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  그룹생성
                </Typography>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <TextField
                      id="outlined-password-input"
                      label="그룹명"
                      autoComplete="current-password"
                      value={groupName}
                      onChange={groupNameHandler}
                      style={{ width: "140px" }}
                    />
                  </Box>
                  <Box>
                    <TextField
                      id="outlined-password-input"
                      label="그룹설명"
                      autoComplete="current-password"
                      value={groupDesc}
                      onChange={groupDescHandler}
                      style={{ width: "140px" }}
                    />
                  </Box>
                  <Button color="primary" onClick={makeGroup}>
                    생성
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
