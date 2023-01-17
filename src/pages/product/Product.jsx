import { Link, useLocation } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import { useEffect } from "react";

export default function Product() {
  const location = useLocation();
  const data = location.state.userInfo;
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">그룹상세</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{data.group}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">그룹원:</span>
              <span className="productInfoValue">{data.groupMemberNumber}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">그룹장:</span>
              <span className="productInfoValue">{data.groupHeader}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
