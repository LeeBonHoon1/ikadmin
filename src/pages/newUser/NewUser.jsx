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
import Loading from "../../components/loading/Loading";
import moment from "moment/moment";
import axios from "axios";

const serverKey =
  "AAAAIQxMYFY:APA91bFhPnAudaMRohshUcYC1vhjZrvvW5b5z1YEC4PS5P-adke7Mh1925oh7fYV16lSZrrtRs003vX_DeXZbLD_9VRrhIz--h0jgeRjxw7bXFadbo9DNoVjfS8ogp16yf8Nvx0z41kD";
const fcmUrl = "https://fcm.googleapis.com/fcm/send";

const headers = {
  "Content-Type": "application/json",
  Authorization: "key=" + serverKey,
};

export default function NewUser() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [group, setGroup] = useState([]);
  const [fbToken, setFbToken] = useState("");
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

  async function newPostPush(token) {
    const message = {
      notification: {
        body: "회원가입 승인됐습니다",
        title: "이강학원",
      },
      to: token,
    };
    await axios
      .post(fcmUrl, message, { headers })
      .then((response) => {
        console.log("success", response.data);
      })
      .catch((error) => {
        console.error("error", error.response.data.error);
      });
    // fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify(message),
    //   headers: new Headers({
    //     "Content-type": "application/json",
    //     Authorization:
    //       "key=AAAAIQxMYFY:APA91bEiP8eLNP-UGtZhFdvLn0Gkh0G6dVTkB2u8dx-7a6CRHyF7Jk5iJUVwVNVsoynLuLGwNekQlW1znZDLtQLbMnC8i9KBE-1dUn5-_kIh6kVLnAzxcbS5yt-XbQOWTBMBtB50s74z",
    //   }),
    // })
    //   .then((response) => {
    //     if (response.status < 200 || response.status >= 400) {
    //       throw (
    //         "Error subscribing to topic: " +
    //         response.status +
    //         " - " +
    //         response.text()
    //       );
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }

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
      field: "create_at",
      headerName: "가입신청일",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.create_at
              ? moment(params.row.create_at).format("YYYY-MM-DD HH:mm")
              : ""}
          </div>
        );
      },
    },
    {
      field: "그룹지정",
      headerName: "그룹지정",
      width: 150,
      renderCell: (params) => {
        return (
          <Select
            value={user.groupName}
            onChange={(e) => {
              const temp = user.map((v) => {
                if (v.USER_IDX === params.id) {
                  v.groupId = e.target.value.GROUP_IDX;
                  v.groupName = e.target.value.name;
                }
                return v;
              });
              setUser(temp);
            }}
            style={{ width: "200px" }}
          >
            {group.map((item, idx) => {
              return (
                <MenuItem value={item} key={idx}>
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
                  group_idx: params.row.groupId,
                  admission: 1,
                };
                if (!param.group_idx) {
                  alert("그룹을 지정해주세요");
                  return;
                }
                setLoading(true);
                await APIs.userAdmission(param)
                  .then((res) => {
                    console.log(res.userInfo.PUSH_TOKEN);
                    newPostPush(res.userInfo.PUSH_TOKEN);
                    setLoading(false);
                    getUserList();
                    // setFbToken(res.userInfo.PUSH_TOKEN);
                  })
                  .catch((err) => {
                    alert("잠시 후 다시 시도해주세요");
                    setLoading(false);
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
      ) : (
        <Loading />
      )}
    </>
  );
}
