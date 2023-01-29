import { Button, MenuItem, Select } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import APIs from "../../lib/APIs";
import "./user.css";

export default function User() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { NAME, EMAIL, NUMBER, USER_IDX, group_name, IN_GROUP } =
    location.state.userInfo;
  const [name, setName] = useState(NAME);
  const [number, setNumber] = useState(NUMBER);
  const [group, setGroup] = useState([]);
  const [selectGroup, setSelectGroup] = useState(group_name);
  const history = useHistory();

  useEffect(() => {
    getUserLogList();
    getGroupList();
  }, []);

  const getUserLogList = useCallback(async () => {
    setLoading(true);
    const param = {
      user_idx: USER_IDX,
    };
    await APIs.getUserLog(param)
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const getGroupList = useCallback(async () => {
    setLoading(true);
    await APIs.getGroupList()
      .then((res) => {
        let newArr = res.map((item) => {
          return item;
        });
        setGroup(newArr);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("잠시후에 다시 시도해주세요.");
      });
  }, []);

  const changeNameHandler = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const changeNumberHandler = useCallback((e) => {
    setNumber(e.target.value);
  }, []);

  const changeGroupHandler = useCallback((e) => {
    setSelectGroup(e.target.value);
  }, []);

  const editUserInfo = async () => {
    const param = {
      user_idx: USER_IDX,
      group_idx: selectGroup,
      number,
      name,
    };

    await APIs.editUser(param)
      .then((res) => {
        console.log(res);
        alert("회원정보가 수정되었습니다.");
        history.push("/users");
      })
      .catch((err) => {
        console.log(err);
        alert("잠시 후 다시 시도해주세요.");
      });
  };

  return (
    <>
      {!loading ? (
        <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">회원 정보 변경</h1>
          </div>
          <div className="userContainer">
            <div className="userUpdate">
              <form className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>이름</label>
                    <input
                      value={name}
                      type="text"
                      className="userUpdateInput"
                      onChange={changeNameHandler}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>이메일</label>
                    <input
                      type="text"
                      value={EMAIL}
                      className="userUpdateInput"
                      disabled
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>전화번호</label>
                    <input
                      type="text"
                      value={number}
                      className="userUpdateInput"
                      onChange={changeNumberHandler}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>그룹</label>
                    <Select value={selectGroup} onChange={changeGroupHandler}>
                      {group.map((item) => {
                        return (
                          <MenuItem value={item.GROUP_IDX}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                </div>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={editUserInfo}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  수정
                </Button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
