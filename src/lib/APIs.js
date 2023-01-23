import { get, post } from "./index";

const host =
  "http://ec2-18-182-33-159.ap-northeast-1.compute.amazonaws.com:3000";

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

const createNotice = (body) => {
  const url = `${host}/notice/postNotice`;
  return post({ url, body });
};

const getUserList = (body) => {
  const url = `${host}/users/userList`;
  return post({ url, body });
};

const APIs = {
  getNoticeList,
  signupRequest,
  signIn,
  checkEmail,
  getSearchUser,
  createNotice,
  getUserList,
};

export default APIs;
