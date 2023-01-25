import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function WidgetSm() {
  const history = useHistory();
  const { data, isLoaded } = useSelector((store) => store.admission);
  const [list, setList] = useState([]);

  useEffect(() => {
    const newArr = data.filter((item) => {
      return item.ADMISSION === "0";
    });
    setList(newArr);
  }, []);

  return (
    <>
      {!isLoaded ? (
        <div className="widgetSm">
          <span className="widgetSmTitle">회원 승인 대기</span>
          <ul className="widgetSmList">
            {list.map((item, idx) => {
              if (idx === 5) {
                return;
              }
              return (
                <li className="widgetSmListItem" key={idx}>
                  <div className="widgetSmUser">
                    <span className="widgetSmUsername">
                      {item.NAME} ({item.NUMBER})
                    </span>
                    <span className="widgetSmUserTitle">
                      {item.EMAIL ? item.EMAIL : ""}
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
      ) : null}
    </>
  );
}
