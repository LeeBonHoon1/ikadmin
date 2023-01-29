import React, { useState, useEffect, useCallback } from "react";
import "./topbar.css";
import { NotificationsNone } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useAppDispatch } from "../../store/index";
import userSlice from "../../slices/user";
import { useHistory } from "react-router-dom";
import APIs from "../../lib/APIs";

export default function Topbar() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const logoutHandler = () => {
    dispatch(
      userSlice.actions.setUser({
        email: "",
      })
    );
    history.push("/login");
  };

  return (
    <>
      {!loading ? (
        <div className="topbar">
          <div className="topbarWrapper">
            <div className="topLeft">
              <span className="logo">이강학원</span>
            </div>
            <div className="topRight">
              <div className="topbarIconContainer">
                <ExitToAppIcon
                  style={{ width: "30px", height: "30px" }}
                  onClick={logoutHandler}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
