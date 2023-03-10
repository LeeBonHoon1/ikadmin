import React, { useRef, useState } from "react";
import "./login.css";
import loginImage from "../../img/admlogin.svg";
import signupImage from "../../img/admsignup.svg";
import APIs from "../../lib/APIs";
import { useAppDispatch } from "../../store/index";
import userSlice from "../../slices/user";
import ClockLoader from "react-spinners/ClockLoader";
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
  const [confirmPassword, setConfirmPassword] = useState("");

  //reset input
  const resetInput = () => {
    setSignupName("");
    setSignupPassword("");
    setSignupEmail("");
    setSignupNumber("");
    setLoginEmail("");
    setLoginPassword("");
    setConfirmPassword("");
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

    await APIs.signIn(param)
      .then((res) => {
        dispatch(
          userSlice.actions.setUser({
            email: res.userInfo.EMAIL,
            name: res.userInfo.NAME,
            number: res.userInfo.NUMBER,
            password: res.userInfo.PASSWORD,
            userIdx: res.userInfo.USER_IDX,
            sortation: res.userInfo.SORTATION,
            token: res.token,
            isLoggedIn: true,
          })
        );
        sessionStorage.setItem("id", res.userInfo.EMAIL);
        sessionStorage.setItem("pw", loginPassword);
        sessionStorage.setItem("accessToken", res.token);
        sessionStorage.setItem("loginStatus", "true");
        resetInput();
        history.push("/");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("잠시후에 다시 시도해주세요");
        resetInput();
        setLoading(false);
      });
  };

  //signup handler

  const checkEmailHandler = async (e) => {
    e.preventDefault();
    console.log("-------------");
    const checkEmailParam = {
      email: signupEmail,
    };

    await APIs.checkEmail(checkEmailParam).then((res) => {
      if (res) {
        alert("이미 등록된 이메일입니다");
      } else {
        signupSubmit();
      }
    });
  };

  const signupNameHandler = (e) => {
    setSignupName(e.target.value);
  };

  const signupPasswordHandler = (e) => {
    setSignupPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const signupEmailHandler = (e) => {
    setSignupEmail(e.target.value);
  };

  const signupNumberHandler = (e) => {
    setSignupNumber(e.target.value);
  };

  const signupSubmit = async () => {
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

    if (signupPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
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

    setLoading(true);

    const param = {
      name: signupName,
      password: signupPassword,
      email: signupEmail,
      number: signupNumber,
      sortation: 1,
    };

    APIs.signupRequest(param)
      .then((res) => {
        if (param.sortation === 1) {
          alert("회원가입이 완료되었습니다.");
        }
        setLoading(false);
        resetInput();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        resetInput();
      });

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
              <h2 className="title" style={{}}>
                회원가입
              </h2>
              {/* <FormControlLabel
                control={<Switch color="primary" />}
                label={toggle ? "회원" : "강사"}
                checked={toggle}
                onChange={toggleChecked}
              /> */}
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
                type="password"
                placeholder="confirm Password"
                value={confirmPassword}
                onChange={confirmPasswordHandler}
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
              <button onClick={checkEmailHandler} className="btn solid">
                {loading ? (
                  <ClockLoader
                    size={25}
                    color={"#fff"}
                    cssOverride={override}
                  />
                ) : (
                  "회원가입"
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
            <p>로그인을 진행해주세요!</p>
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
