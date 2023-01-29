import "./NoticeDetail.css";
import { useState } from "react";
import { Typography, TextField, Button, Box } from "@material-ui/core";
import APIs from "../../lib/APIs";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NoticeDetail() {
  const location = useLocation();
  const history = useHistory();
  const [select, setSelect] = useState("");
  const [showGroupSelect, setShowGroupSelect] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");

  const { TITLE, CONTENT, NOTICE_IDX } = location.state.noticeInfo;
  console.log(location.state);
  useEffect(() => {
    setTitle(TITLE);
    setContent(CONTENT);
  }, []);

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
      num: NOTICE_IDX,
      title: title,
      content: content,
      // target: select === all ? 0 : target
    };

    await APIs.editNotice(param)
      .then((res) => {
        console.log("createNotice :::", res);
        resetInput();
        history.push("/noticelist");
        alert("공지가 수정됐습니다.");
      })
      .catch((err) => {
        console.log(err);
        alert("잠시 후 다시 시도해주세요.");
      });
  };

  const deleteNotice = async () => {
    const param = {
      num: NOTICE_IDX,
    };

    await APIs.deleteNotice(param)
      .then((res) => {
        alert("공지가 삭제됐습니다");
        history.push("/noticelist");
      })
      .catch((err) => {
        alert("잠시 후 다시 시도해주세요.");
      });
  };

  return (
    <>
      <div className="noticeList">
        <Box style={{ flex: 3, padding: "10px", marginRight: "10px" }}>
          <Typography variant="h4">공지상세</Typography>
          <TextField
            value={title}
            multiline
            onChange={titleHandler}
            variant="outlined"
            style={{
              width: "100%",
              marginTop: "10px",
            }}
          />
          <TextField
            value={content}
            multiline
            onChange={contentHandler}
            rows={20}
            variant="outlined"
            style={{
              width: "100%",
              marginTop: "10px",
            }}
          />
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px",
            }}
          >
            <Button
              variant="outlined"
              size="large"
              color="secondary"
              style={{ marginTop: "10px", marginLeft: "10px" }}
              onClick={deleteNotice}
            >
              삭제
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              style={{ marginTop: "10px" }}
              onClick={submitNotice}
            >
              수정
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
}
