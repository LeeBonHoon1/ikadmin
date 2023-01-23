import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  MailOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  const [active, setActive] = useState(false);
  const path = location.pathname;

  useEffect(() => {}, [active]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem">
                <LineStyle className="sidebarIcon" />홈
              </li>
            </Link>
          </ul>
          <ul className="sidebarList">
            <Link to="/noticelist" className="link">
              <li className="sidebarListItem">
                <ContactMailIcon className="sidebarIcon" />
                공지사항
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                회원
              </li>
            </Link>
            <Link to="/group" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                그룹
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <Link to="/newUser" className="link">
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon" />
                회원승인
              </li>
            </Link>
            <Link to="/notice" className="link">
              <li className="sidebarListItem">
                <MailOutline className="sidebarIcon" />
                공지등록
              </li>
            </Link>
            <Link to="/log" className="link">
              <li className="sidebarListItem">
                <Report className="sidebarIcon" />
                로그
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
