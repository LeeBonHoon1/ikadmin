import "./group.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { groupRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Group() {
  const [data, setData] = useState(groupRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "group",
      headerName: "그룹",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.group}</div>;
      },
    },
    { field: "groupMemberNumber", headerName: "그룹원", width: 200 },
    {
      field: "groupHeader",
      headerName: "그룹장",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
