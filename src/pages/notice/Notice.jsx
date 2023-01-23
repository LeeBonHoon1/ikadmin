import "./Notice.css";
import { useState } from "react";
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

const group = [
  {
    value: "A",
    label: "A",
  },
  {
    value: "B",
    label: "B",
  },
];

export default function Notice() {
  const history = useHistory();
  const userInfo = useSelector((state) => state.user);
  const [select, setSelect] = useState("");
  const [showGroupSelect, setShowGroupSelect] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  const selectHandler = (e) => {
    e.target.value === "group"
      ? setShowGroupSelect(true)
      : setShowGroupSelect(false);
    setSelect(e.target.value);
  };

  const targetHandler = (e) => {
    setTarget(e.target.value);
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
      // target: select === all ? 0 : target
    };

    await APIs.createNotice(param)
      .then((res) => {
        console.log("createNotice :::", res);
        resetInput();
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
                onChange={targetHandler}
                style={{
                  marginTop: "10px",
                }}
              >
                {group.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
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
