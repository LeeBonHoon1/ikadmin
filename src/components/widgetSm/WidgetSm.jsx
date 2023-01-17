import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

export default function WidgetSm() {
  const history = useHistory();
  const newMember = [
    {
      name: "이본훈",
      number: "01021830828",
      sortation: 1,
    },
    {
      name: "김요셉",
      number: "01021830828",
      sortation: 2,
    },
    {
      name: "김요셉",
      number: "01021830828",
      sortation: 2,
    },
  ];
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">회원 승인 대기</span>
      <ul className="widgetSmList">
        {newMember.map((item, idx) => {
          if (idx === 5) {
            return;
          }
          return (
            <li className="widgetSmListItem">
              <div className="widgetSmUser" key={idx}>
                <span className="widgetSmUsername">
                  {item.name} ({item.number})
                </span>
                <span className="widgetSmUserTitle">
                  {item.sortation === 1 ? "강사" : "학생"}
                </span>
              </div>
              <button
                className="widgetSmButton"
                onClick={() => {
                  history.push("/log");
                }}
              >
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
