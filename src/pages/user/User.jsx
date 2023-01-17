import { Button } from "@material-ui/core";
import {
  CalendarToday,
  InfoOutlined,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./user.css";

export default function User() {
  const location = useLocation();
  const info = location.state.userInfo;

  console.log(info);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">회원 정보 변경</h1>
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>이름</label>
                <input
                  type="text"
                  placeholder={info.username}
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>이메일</label>
                <input
                  type="text"
                  placeholder={info.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>전화번호</label>
                <input
                  type="text"
                  placeholder={info.number}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>그룹</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  placeholder={info.group}
                />
              </div>
            </div>
            <Button
              color="primary"
              variant="outlined"
              style={{
                marginTop: "10px",
              }}
            >
              수정
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
