import axios from 'axios';

const loginURL = 'https://still-cove-80123.herokuapp.com/api/login';
const usersURL = 'https://still-cove-80123.herokuapp.com/api/users';


//註冊
export const register = async ({ account, name, email, password, checkPassword }) => {
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
    console.error('[Register Failed]: ', error.response.data);
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
      return { success: true, data: data.data.token };
    }
    return data;
    
  } catch (error) {
    console.error('[Login Failed]:', error.response.data);
  }
};




//串接 test-token
export const checkPermission = async (authToken) => {
  try {
    const response = await axios.get(`${loginURL}`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return response.data.success;
 } catch (error) {
    console.error('[Check Permission Failed]:', error);
  }
};
