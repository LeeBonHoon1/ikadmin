import React, { useState } from "react";
import "./topbar.css";
import { NotificationsNone } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/index";
import userSlice from "../../slices/user";
import { useHistory } from "react-router-dom";

export default function Topbar() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(
      userSlice.actions.setUser({
        email: "",
      })
    );
    history.push("/login");
  };
  const newMember = 0;
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">이강학원</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone style={{ width: "30px", height: "30px" }} />
            <span className="topIconBadge">{newMember}</span>
          </div>
          <div className="topbarIconContainer">
            <ExitToAppIcon
              style={{ width: "30px", height: "30px" }}
              onClick={logoutHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
