import axios from 'axios';

const AdminLoginURL = 'https://still-cove-80123.herokuapp.com/api/admin/login';


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
    console.error('[Login Failed]:', error.response.data);
  }
};




//串接 test-token
//export const checkPermission = async (authToken) => {
  //try {
   // const response = await axios.get(`${AdminLoginURL}/test-token`, {
    //  headers: {
     //   Authorization: 'Bearer ' + authToken,
    //  },
   // });
  //  return response.data.success;
 // } catch (error) {
 //   console.error('[Check Permission Failed]:', error);
  //}
//};
