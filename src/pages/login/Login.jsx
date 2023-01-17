import React, { useRef, useState } from "react";
import "./login.css";
import loginImage from "../../img/admlogin.svg";
import signupImage from "../../img/admsignup.svg";
import APIs from "../../lib/APIs";
import { useAppDispatch } from "../../store/index";
import userSlice from "../../slices/user";
import ClockLoader from "react-spinners/ClockLoader";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Login = () => {
  const dispatch = useAppDispatch();
  const loginContainer = useRef();
  const history = useHistory();

  //toggle state
  const [toggle, setToggle] = useState(true);
  const toggleChecked = () => {
    setToggle((prev) => !prev);
  };

  //loading state
  const [loading, setLoading] = useState(false);

  //login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //signup state
  const [signupName, setSignupName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupNumber, setSignupNumber] = useState("");

  //reset input
  const resetInput = () => {
    setSignupName("");
    setSignupPassword("");
    setSignupEmail("");
    setSignupNumber("");
    setLoginEmail("");
    setLoginPassword("");
  };

  //login handler
  const signupBtnHandler = (e) => {
    e.preventDefault();
    loginContainer.current.classList.add("sign-up-mode");
    console.log(loginContainer.current);
  };

  const loginBtnHandler = (e) => {
    e.preventDefault();
    loginContainer.current.classList.remove("sign-up-mode");
    console.log(loginContainer.current);
  };

  const loginEmailInputHandler = (e) => {
    setLoginEmail(e.target.value);
  };

  const loginPasswordInputHandler = (e) => {
    setLoginPassword(e.target.value);
  };

  const loginSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!loginEmail) {
      alert("이메일을 입력해주세요.");
      setLoading(false);
      return;
    }
    if (!loginPassword) {
      alert("비밀번호를 입력해주세요.");
      setLoading(false);
      return;
    }

    const param = {
      email: loginEmail,
      password: loginPassword,
    };

    // setTimeout(() => {
    //   resetInput();
    //   setLoading(false);
    //   dispatch(
    //     userSlice.actions.setUser({
    //       email: "test@gmail.com",
    //       sortation: 1, // 강사
    //       // sortation: 2, // 학생
    //     })
    //   );
    //   history.push("/");
    // }, 2000);

    await APIs.signIn(param)
      .then((res) => {
        dispatch(
          userSlice.actions.setUser({
            email: res[0].EMAIL,
            name: res[0].NAME,
            number: res[0].NUMBER,
            password: res[0].PASSWORD,
            userIdx: res[0].USER_IDX,
            sortation: res[0].SORTATION, // 강사
            // sortation: 2, // 학생
          })
        );
        console.log("res ::", res);
        setLoading(false);
        resetInput();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        alert("잠시후에 다시 시도해주세요");
        resetInput();
        setLoading(false);
      });
  };

  //signup handler
  const signupNameHandler = (e) => {
    setSignupName(e.target.value);
  };

  const signupPasswordHandler = (e) => {
    setSignupPassword(e.target.value);
  };

  const signupEmailHandler = (e) => {
    setSignupEmail(e.target.value);
  };

  const signupNumberHandler = (e) => {
    setSignupNumber(e.target.value);
  };

  const signupSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!signupName) {
      alert("이름을 입력해주세요");
      return;
    }
    if (!signupPassword) {
      alert("비밀번호를 입력해주세요");
      return;
    }
    if (!signupEmail) {
      alert("이메일을 입력해주세요");
      return;
    }

    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        signupEmail
      )
    ) {
      alert("올바른 이메일 주소가 아닙니다.");
    }

    if (!signupNumber) {
      alert("연락처를 입력해주세요");
      return;
    }

    const param = {
      name: signupName,
      password: signupPassword,
      email: signupEmail,
      number: signupNumber,
      sortation: !toggle ? 1 : 2,
    };

    console.log(param);

    // APIs.signupRequest(param)
    //   .then((res) => {
    //     console.log(res);
    //     setLoading(false);
    //     resetInput();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setLoading(false);
    //     resetInput();
    //   });

    resetInput();
    setLoading(false);
  };

  return (
    <div className="loginContainer" ref={loginContainer}>
      <div className="forms-loginContainer">
        <div className="signin-signup">
          <form action="" className="sign-in-form" onSubmit="return false">
            <h2 className="title">로그인</h2>
            <div className="input-field">
              <i class="fa-regular fa-user" />
              <input
                type="text"
                placeholder="email"
                value={loginEmail}
                onChange={loginEmailInputHandler}
              />
            </div>
            <div className="input-field">
              <i class="fa-regular fa-user" />
              <input
                type="password"
                placeholder="password"
                value={loginPassword}
                onChange={loginPasswordInputHandler}
              />
            </div>
            <button className="btn solid" onClick={loginSubmit}>
              {loading ? (
                <ClockLoader size={25} color={"#fff"} cssOverride={override} />
              ) : (
                "로그인"
              )}
            </button>
          </form>

          <form action="" className="sign-up-form">
            <div style={{ display: "flex" }}>
              <h2 className="title" style={{ marginRight: "30px" }}>
                회원가입
              </h2>
              <FormControlLabel
                control={<Switch color="primary" />}
                label={toggle ? "회원" : "강사"}
                checked={toggle}
                onChange={toggleChecked}
              />
            </div>
            <div className="input-field">
              <i class="fa-regular fa-user" />
              <input
                type="text"
                placeholder="name"
                value={signupName}
                onChange={signupNameHandler}
              />
            </div>
            <div className="input-field">
              <i class="fa-regular fa-user" />
              <input
                type="password"
                placeholder="password"
                value={signupPassword}
                onChange={signupPasswordHandler}
              />
            </div>
            <div className="input-field">
              <i class="fa-regular fa-user" />
              <input
                type="text"
                placeholder="email"
                value={signupEmail}
                onChange={signupEmailHandler}
              />
            </div>
            <div className="input-field">
              <i class="fa-regular fa-user" />
              <input
                type="text"
                placeholder="number"
                value={signupNumber}
                onChange={signupNumberHandler}
              />
            </div>
            <div style={{ display: "flex" }}>
              <button onClick={signupSubmit} className="btn solid">
                {loading ? (
                  <ClockLoader
                    size={25}
                    color={"#fff"}
                    cssOverride={override}
                  />
                ) : toggle ? (
                  "회원가입"
                ) : (
                  "강사 회원가입"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-loginContainer">
        <div className="panel left-panel">
          <div className="content">
            <h3>이강학원 회원이신가요?</h3>
            <p>회원이 아니면 회원가입을 진행해주세요!</p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={signupBtnHandler}
            >
              회원가입
            </button>
            <img src={loginImage} className="image" />
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>회원가입을 완료하셨나요?</h3>
            <p>관리자 승인 후 로그인을 진행해주세요!</p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={loginBtnHandler}
            >
              로그인
            </button>
            <img src={signupImage} className="image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
