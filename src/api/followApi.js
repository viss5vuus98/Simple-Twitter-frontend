import axios from 'axios';

const baseUrl = 'https://still-cove-80123.herokuapp.com/api';

//取得使用者正在追蹤的全部使用者
//GET api/users/:id/followings 
export const getUsersFollowing = async (userId) => {
  const authToken = localStorage.getItem('authToken') || '';
  try {
    const response = await axios.get(`${baseUrl}/users/${userId}/followings`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Get Data Failed :', error);
  }
};

//取得正在追蹤目前使用者的其他使用者
// api/users/:id/followers 
export const getUsersFollowers = async (userId) => {
  const authToken = localStorage.getItem('authToken') || '';
  try {
    const response = await axios.get(`${baseUrl}/users/${userId}/followers`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Get Data Failed :', error);
  }
};