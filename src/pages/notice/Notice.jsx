import "./Notice.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
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

const currencies = [
  {
    value: "A",
    label: "전체",
  },
  {
    value: "B",
    label: "그룹",
  },
];
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
  const [data, setData] = useState(userRows);
  const [select, setSelect] = useState("");
  const [showGroupSelect, setShowGroupSelect] = useState(false);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const selectHandler = (e) => {
    if (e.target.value === "group") setShowGroupSelect(true);
    if (e.target.value === "all") setShowGroupSelect(false);
    setSelect(e.target.value);
  };

  return (
    <>
      <div className="noticeList">
        <Box style={{ flex: 3 }}>
          <Typography variant="h4">공지사항</Typography>
          <TextField
            placeholder="공지사항을 입력해주세요"
            multiline
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
            >
              등록
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
}
