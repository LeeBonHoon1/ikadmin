import { get, post } from "./index";

// const host = "https://egback.loca.lt";
const host = "http://192.168.35.50:3000";

const getNoticeList = () => {
  const url = `${host}/notice/getNoticeList`;

  return get({ url });
};

const signupRequest = (body) => {
  const url = `${host}/users/signup`;
  return post({ url, body });
};

const signIn = (body) => {
  const url = `${host}/users/login`;
  return post({ url, body });
};

const checkEmail = (body) => {
  const url = `${host}/users/emailCheck`;
  return post({ url, body });
};

const getSearchUser = (body) => {
  const url = `${host}/users/userSearch`;
  return post({ url, body });
};

const APIs = {
  getNoticeList,
  signupRequest,
  signIn,
  checkEmail,
  getSearchUser,
};

export default APIs;
