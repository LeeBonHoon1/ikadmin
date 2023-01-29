import { Link, useLocation, useHistory } from "react-router-dom";
import "./product.css";
import { useEffect, useState, useCallback } from "react";
import { DataGrid } from "@material-ui/data-grid";
import APIs from "../../lib/APIs";

export default function Product() {
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState([]);
  const data = location.state.userInfo;
  useEffect(() => {
    if (data) {
      getDetailData();
    }
  }, []);

  const getDetailData = useCallback(async () => {
    const param = {
      idx: data.GROUP_IDX,
    };
    setLoading(true);
    await APIs.getGroupDetail(param)
      .then((res) => {
        let newArr = res.map((item, idx) => {
          return item;
        });
        setStudent(newArr);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("잠시후에 다시 시도해주세요.");
      });
  }, []);

  const columns = [
    {
      field: "NAME",
      headerName: "이름",
      width: 150,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.NAME}</div>;
      },
    },
    { field: "EMAIL", headerName: "이메일", width: 200 },
    {
      field: "NUMBER",
      headerName: "연락처",
      width: 170,
    },
  ];

  return (
    <>
      {!loading && data ? (
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">그룹상세</h1>
          </div>
          <div className="productTop">
            <div className="productTopRight">
              <div className="productInfoTop">
                <span className="productName">{data.name}</span>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">그룹원:</span>
                  <span className="productInfoValue">{data.student_count}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">그룹장:</span>
                  <span className="productInfoValue">{data.teacher_name}</span>
                </div>
              </div>
            </div>
          </div>
          <DataGrid
            rows={student}
            disableSelectionOnClick
            columns={columns.map((item) => ({
              ...item,
            }))}
            pageSize={10}
            checkboxSelection
            getRowId={(row) => row.USER_IDX}
          />
        </div>
      ) : null}
    </>
  );
}
