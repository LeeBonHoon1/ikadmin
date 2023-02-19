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

const getGroupList = (body) => {
  const url = `${host}/group/groupInfoList`;
  return post({ url, body });
};

const getGroupDetail = (body) => {
  const url = `${host}/group/groupDetailInfo`;
  return post({ url, body });
};

const getUserLog = (body) => {
  const url = `${host}/users/userNoticeLog`;
  return post({ url, body });
};

const editNotice = (body) => {
  const url = `${host}/notice/editNotice`;
  return post({ url, body });
};

const deleteNotice = (body) => {
  const url = `${host}/notice/deleteNotice`;
  return post({ url, body });
};

const editUser = (body) => {
  const url = `${host}/users/editUser`;
  return post({ url, body });
};

const userAdmission = (body) => {
  const url = `${host}/users/userAdmission`;
  return post({ url, body });
};

const userRegistGroup = (body) => {
  const url = `${host}/users/userRegistGroup`;
  return post({ url, body });
};

const makeGroup = (body) => {
  const url = `${host}/group/makeGroup`;
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
  getGroupList,
  getGroupDetail,
  getUserLog,
  editNotice,
  deleteNotice,
  editUser,
  userRegistGroup,
  userAdmission,
  makeGroup,
};

export default APIs;
