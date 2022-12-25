import axios from 'axios';

const baseUrl = 'https://still-cove-80123.herokuapp.com/api';

//取得使用者正在追蹤的全部使用者
//GET api/users/:id/followings 

export const getUserFollowings = async (userId) => {
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
