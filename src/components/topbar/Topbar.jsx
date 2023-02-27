import React, { useState, useEffect, useCallback } from "react";
import "./topbar.css";
import { NotificationsNone } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useAppDispatch } from "../../store/index";
import userSlice from "../../slices/user";
import { useHistory } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import APIs from "../../lib/APIs";

export default function Topbar() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const logoutHandler = () => {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("pw");
    sessionStorage.removeItem("loginStatus");
    dispatch(
      userSlice.actions.setUser({
        email: "",
        name: "",
        number: "",
        password: "",
        userIdx: 0,
        sortation: 0,
        token: "",
        isLoggedIn: false,
      })
    );
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
      ) : (
        <Loading />
      )}
    </>
  );
}
