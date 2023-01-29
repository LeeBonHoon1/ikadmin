import Chart from "../../components/chart/Chart";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import { useEffect } from "react";
import { fetchHome } from "../../slices/admission";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { data, isLoaded } = useSelector((store) => store.admission);

  useEffect(() => {
    dispatch(fetchHome());
  }, []);

  return (
    <>
      {!isLoaded ? (
        <div className="home">
          <Chart
            data={userData}
            title="User Analytics"
            grid
            dataKey="Active User"
          />
          <div className="homeWidgets">
            <WidgetSm test={data} loading={isLoaded} />
          </div>
        </div>
      ) : null}
    </>
  );
}
