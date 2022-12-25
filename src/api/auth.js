import axios from 'axios';
import Swal from 'sweetalert2';
const loginURL = 'https://still-cove-80123.herokuapp.com/api/login';
const usersURL = 'https://still-cove-80123.herokuapp.com/api/users';
const AdminLoginURL = 'https://still-cove-80123.herokuapp.com/api/admin/login';

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
    debugger
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
    console.error('[Login Failed]:', error.response.data);
  }
};

//api/TokenAuthenticate
export const tokenAuthenticate = async () => {
  const authToken = localStorage.getItem('authToken') || '';
  try{
     const res = await axios.get(`https://still-cove-80123.herokuapp.com/api/TokenAuthenticate`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    )
    return res.data
  }catch(error){
    console.error('[GET Failed]:', error.response.data);
  }
}


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
   // const response = await axios.get(`${loginURL}`, {
      //headers: {
        //Authorization: 'Bearer ' + authToken,
     // },
   // });
   // return response.data.success;
// } catch (error) {
//    console.error('[Check Permission Failed]:', error);
//  }
//};
