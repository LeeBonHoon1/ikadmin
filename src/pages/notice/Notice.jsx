import "./Notice.css";
import { useState, useCallback, useEffect } from "react";
import {
  Typography,
  TextField,
  MenuItem,
  Select,
  FormHelperText,
  Button,
  Box,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import APIs from "../../lib/APIs";
import { useHistory } from "react-router-dom";
import axios from "axios";

let groupIndex = [];

export default function Notice() {
  const history = useHistory();
  const userInfo = useSelector((state) => state.user);
  const [select, setSelect] = useState("");
  const [showGroupSelect, setShowGroupSelect] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState([]);

  const [group, setGroup] = useState([]);
  const [selectGroup, setSelectGroup] = useState("");

  const fcmUrl = process.env.REACT_APP_FIREBASEURL;
  const serverKey = process.env.REACT_APP_FIREBASEKEY;

  const headers = {
    "Content-Type": "application/json",
    Authorization: "key=" + serverKey,
  };

  useEffect(() => {
    getGroupList();
  }, []);

  const changeGroupHandler = useCallback(async (e) => {
    setSelectGroup(e.target.value);
    setLoading(true);
    groupIndex = e.target.value;
    getTk(groupIndex);
  }, []);

  const getTk = async (groupIndex) => {
    await APIs.getTokens({ idxs: groupIndex })
      .then((res) => {
        setToken(res.PUSH_TOKEN);
        setLoading(false);
      })
      .catch((err) => {
        alert("잠시 후 다시 시도해주세요");
        setLoading(false);
      });
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  async function newPostPush(token) {
    console.log("token", token);
    const message = {
      notification: {
        body: "공지가 등록되었습니다.",
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
  }

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

  const selectHandler = (e) => {
    e.target.value === "group"
      ? setShowGroupSelect(true)
      : setShowGroupSelect(false);
    setSelect(e.target.value);
  };

  const resetInput = () => {
    setTitle("");
    setContent("");
    setSelect("");
  };

  const submitNotice = async () => {
    const param = {
      title: title,
      content: content,
      userIdx: userInfo.userIdx,
      target: select === "all" ? 0 : selectGroup,
    };
    await APIs.createNotice(param)
      .then((res) => {
        resetInput();
        newPostPush(token);
        history.push("/noticelist");
        alert("공지가 등록됐습니다.");
      })
      .catch((err) => {
        console.log(err);
        alert("잠시 후 다시 시도해주세요.");
      });
  };

  return (
    <>
      <div className="noticeList">
        <Box style={{ flex: 3 }}>
          <Typography variant="h4">공지등록</Typography>
          <TextField
            placeholder="타이틀을 입력해주세요."
            multiline
            onChange={titleHandler}
            variant="outlined"
            style={{
              width: "100%",
              marginTop: "10px",
            }}
          />
          <TextField
            placeholder="공지사항을 입력해주세요"
            multiline
            onChange={contentHandler}
            rows={20}
            variant="outlined"
            style={{
              width: "100%",
              marginTop: "10px",
            }}
          />
        </Box>
        <Box style={{ flex: 1, marginTop: "50px", marginRight: "20px" }}>
          <div className="selectBox">
            <Select label="age" value={select} onChange={selectHandler}>
              <MenuItem value={"all"}>전체</MenuItem>
              <MenuItem value={"group"}>그룹</MenuItem>
            </Select>
            <FormHelperText>공지할 대상을 선택해주세요.</FormHelperText>
            {showGroupSelect ? (
              <TextField
                id="outlined-select-currency"
                select
                helperText="그룹을 선택해주세요."
                value={selectGroup}
                onChange={changeGroupHandler}
                style={{
                  marginTop: "10px",
                }}
              >
                {group.map((option, idx) => (
                  <MenuItem value={option.GROUP_IDX} key={idx}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            ) : null}
            <Button
              variant="outlined"
              size="large"
              color="primary"
              style={{ marginTop: "10px" }}
              onClick={submitNotice}
            >
              등록
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
}
