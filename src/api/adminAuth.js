import axios from 'axios';

const AdminLoginURL = 'https://simple-twitter/api/admin/login';


//後台登入
export const adminLogin = async ({ adminAccount, adminPassword }) => {
  try {
    const { data } = await axios.post(`${AdminLoginURL}/login`, {
      adminAccount,
      adminPassword,
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
    const response = await axios.get(`${AdminLoginURL}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return response.data.success;
  } catch (error) {
    console.error('[Check Permission Failed]:', error);
  }
};
