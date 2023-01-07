import React, { useState } from "react";
import "./topbar.css";
import { NotificationsNone, Settings } from "@material-ui/icons";
import { useEffect } from "react";

export default function Topbar() {
  const newMember = 0;
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">BH</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone style={{ width: "30px", height: "30px" }} />
            <span className="topIconBadge">{newMember}</span>
          </div>
          <div className="topbarIconContainer">
            <Settings style={{ width: "30px", height: "30px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
