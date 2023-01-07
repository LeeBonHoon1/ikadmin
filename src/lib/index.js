import axios from "axios";

export const get = async ({ url, params = {}, headers = {} }) => {
  try {
    const result = await axios.get(url, {
      ...params,
      headers: {
        ...headers,
      },
    });
    const { data } = result;
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const post = async ({ url, body = {}, params = {}, headers = {} }) => {
  try {
    const result = await axios.post(url, body, {
      ...params,
      headers: {
        ...headers,
      },
    });
    const { data } = result;
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
