import axios from 'axios';

const baseUrl = 'https://still-cove-80123.herokuapp.com/api';

//取得跟隨者 (followers) 數量排列前 10 的推薦使用者清單
//GET api/users/recommendUsers
export const getRecommendUsers = async () => {
  const authToken = localStorage.getItem('authToken') || '';
  try{
    const response = await axios.get(
      `${baseUrl}/users/recommendUsers`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    )
    return response.data
  }catch(error){
    console.error('Get Data Failed :', error);
  }

}

//新增追蹤特定使用者
//POST api/followships
//userId 目標對象ID
export const followShip = async (userId) => {
  const authToken = localStorage.getItem('authToken') || '';
  try {
      const res = await axios.post(
        `${baseUrl}/followships`, 
        {
          id: userId
        }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        },
      });
      return res.data
  } catch (error) {
    console.error('[failed]: ', error);
  }
};

//新增追蹤特定使用者
//POST api/followships
//userId 目標對象ID
export const unFollowShip = async (followingId) => {
  const authToken = localStorage.getItem('authToken') || '';
  try {
      const res = await axios.delete(
        `${baseUrl}/followships/${followingId}`, 
        {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return res.data
  } catch (error) {
    console.error('[failed]: ', error);
  }
};


//GET api/users/:id/followings 
export const getFollowingUsers = async (userId) => {
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