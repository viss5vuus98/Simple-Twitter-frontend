import axios from 'axios';
import Swal from 'sweetalert2';
const loginURL = 'https://still-cove-80123.herokuapp.com/api/login';
const usersURL = 'https://still-cove-80123.herokuapp.com/api/users';
const AdminLoginURL = 'https://still-cove-80123.herokuapp.com/api/admin/login';

//註冊
export const register = async ({
  account,
  name,
  email,
  password,
  checkPassword,
}) => {
  try {
    const { data } = await axios.post(`${usersURL}`, {
      account,
      name,
      email,
      password,
      checkPassword,
    });

    if (data.status) {
      return { success: true };
    }

    return data;
  } catch (error) {
    Swal.fire({
      position: 'top',
      title: `註冊失敗！ ${error.response.data.message}`,
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    });
  }
};

//前台登入
export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${loginURL}`, {
      account,
      password,
    });
    if (data.data.token) {
      tokenAuthenticate();
      return { success: true, data: data.data };
    }
    return data;
  } catch (error) {
    Swal.fire({
      position: 'top',
      title: `${error.response.data.message}`,
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    });
  }
};

//api/TokenAuthenticate
export const tokenAuthenticate = async () => {
  const authToken = localStorage.getItem('authToken') || '';
  try {
    const res = await axios.get(
      `https://still-cove-80123.herokuapp.com/api/TokenAuthenticate`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error('[GET Failed]:', error.response.data);
  }
};

//後台登入
export const adminLogin = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${AdminLoginURL}`, {
      account,
      password,
    });

    if (data.data.token) {
      return { success: true, data: data.data.token };
    }
    return data;
  } catch (error) {
    Swal.fire({
      position: 'top',
      title: `${error.response.data.message}`,
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    });
  }
};

//GET  /api/users/self
export const getUserSelf = async () => {
  const authToken = localStorage.getItem('authToken') || '';
  try {
    const res = await axios.get(
      `https://still-cove-80123.herokuapp.com/api/users/self`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error('[GET Failed]:', error.response.data);
  }
};
