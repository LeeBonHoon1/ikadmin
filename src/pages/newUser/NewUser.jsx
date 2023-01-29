import "./newUser.css";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Modal,
  Box,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import APIs from "../../lib/APIs";

export default function NewUser() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 150,
    backgroundColor: "white",
    border: "1px solid #fff",
    boxShadow: 24,
    borderRadius: "5px",
    p: 4,
  };

  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [group, setGroup] = useState([]);
  const [userId, setUserId] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [selectGroup, setSelectGroup] = useState("");

  useEffect(() => {
    getUserList();
    getGroupList();
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
        console.log(err);
        setLoading(false);
        alert("잠시후에 다시 시도해주세요.");
      });
  }, []);

  const changeGroupHandler = useCallback((e) => {
    setSelectGroup(e.target.value);
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
      field: "그룹지정",
      headerName: "그룹지정",
      width: 150,
      renderCell: (params) => {
        return (
          <Select
            value={selectGroup}
            onChange={changeGroupHandler}
            style={{ width: "200px" }}
          >
            {group.map((item, idx) => {
              return (
                <MenuItem value={item.GROUP_IDX} key={idx}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        );
      },
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
              onClick={async () => {
                const param = {
                  idx: params.row.USER_IDX,
                  group_idx: selectGroup,
                  admission: 1,
                };
                await APIs.userAdmission(param)
                  .then((res) => {
                    getUserList();
                    alert("승인됐습니다");
                    setOpen(false);
                  })
                  .catch((err) => {
                    alert("잠시 후 다시 시도해주세요");
                    setOpen(false);
                  });
              }}
            >
              승인
            </button>
            <button className="userListDelete">거절</button>
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
