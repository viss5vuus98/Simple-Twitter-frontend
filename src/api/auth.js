import axios from 'axios';

const loginURL = 'https://simple-twitter/api/login';
const usersURL = 'https://simple-twitter/api/users';


//註冊
export const register = async ({ account, name, email, password, checkPassword }) => {
  try {
    const { data } = await axios.post(`${usersURL}/register`, {
      account,
      name,
      email,
      password,
      checkPassword,
    });
    const { authToken } = data;

    if (authToken) {
      return { success: true, ...data };
    }

    return data;
  } catch (error) {
    console.error('[Register Failed]: ', error);
  }
};



//前台登入
export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${loginURL}/login`, {
      account,
      password,
    });

    const { authToken } = data;

    if (authToken) {
      return { success: true, ...data };
    }

    return data;
  } catch (error) {
    console.error('[Login Failed]:', error);
  }
};




//串接 test-token
export const checkPermission = async (authToken) => {
  try {
    const response = await axios.get(`${loginURL}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return response.data.success;
  } catch (error) {
    console.error('[Check Permission Failed]:', error);
  }
};
