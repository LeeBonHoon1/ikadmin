import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";

export default function WidgetSm({ test, loading }) {
  const history = useHistory();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!loading) {
      const newArr = test.filter((item) => {
        return item.ADMISSION === "0" && item.SORTATION !== 1;
      });
      setList(newArr);
    }
  }, []);

  return (
    <>
      {!loading ? (
        <div className="widgetSm">
          <span className="widgetSmTitle">회원 승인 대기</span>
          <ul className="widgetSmList">
            {list.map((item, idx) => {
              if (idx >= 5) {
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
                      history.push("/newUser");
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
      ) : (
        <Loading />
      )}
    </>
  );
}
