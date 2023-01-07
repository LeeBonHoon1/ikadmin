import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";

export default function WidgetSm() {
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
              <div className="widgetSmUser">
                <span className="widgetSmUsername">
                  {item.name} ({item.number})
                </span>
                <span className="widgetSmUserTitle">
                  {item.sortation === 1 ? "강사" : "학생"}
                </span>
              </div>
              <button className="widgetSmButton">
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
