import React, { useState, useEffect } from "react";
import "./topbar.css";
import { NotificationsNone } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useAppDispatch } from "../../store/index";
import userSlice from "../../slices/user";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Topbar() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [admission, setAdmission] = useState(0);
  const { data, isLoaded } = useSelector((store) => store.admission);

  useEffect(() => {
    const list = data.filter((item) => {
      return item.ADMISSION === "0" && item.SORTATION !== 1;
    });

    setAdmission(list.length);
  }, [dispatch]);

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
      {!isLoaded ? (
        <div className="topbar">
          <div className="topbarWrapper">
            <div className="topLeft">
              <span className="logo">이강학원</span>
            </div>
            <div className="topRight">
              <div className="topbarIconContainer">
                <NotificationsNone style={{ width: "30px", height: "30px" }} />
                <span className="topIconBadge">{admission}</span>
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
      ) : null}
    </>
  );
}
