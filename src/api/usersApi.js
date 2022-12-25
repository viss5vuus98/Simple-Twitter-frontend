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

//取消追蹤特定使用者
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

//取得特定使用者資料 (包含本人都是打這一條)
//GET  api/users/:id
//userId: number
export const getUserInfo = async (userId) => {
  const authToken = localStorage.getItem('authToken') || '';
  try{
    const response = await axios.get(
      `${baseUrl}/users/${userId}`,
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

//修改特定使用者『個人』資料
//PUT  api/users/:id 
export const EditUserInfo = async (userId, name, avatar, background, introduction) => {
  const authToken = localStorage.getItem('authToken') || '';
  const formData = new FormData()
  formData.append("name", name)
  formData.append("avatar", avatar)
  formData.append("background", background)
  formData.append("introduction", introduction)
  try{
    const res = await axios.put(`${baseUrl}/users/${userId}`,
      formData,{
          headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      return res.data
  }catch(error){
    console.error('Put Data Failed :', error);
  }
}
// export const EditUserInfo = async (userId, name, avatar, background, introduction) => {
//   const authToken = localStorage.getItem('authToken') || '';
//   debugger
//   const formData = new FormData()
//   formData.append('files',avatar)
//   formData.append('files', background)
//   try{
//     const res = await axios.put(`${baseUrl}/users/${userId}`,
//       formData,{
//           headers: {
//           Authorization: `Bearer ${authToken}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       })
//       return res.data
//   }catch(error){
//     console.error('Put Data Failed :', error);
//   }
// }


//取得特定使用者全部的留言
// GET api/v1/users/1/replies
export const getUserReplies = async (userId) => {
  const authToken = localStorage.getItem('authToken') || '';
  try{
    const response = await axios.get(
      `${baseUrl}/users/${userId}/replied_tweets`,
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

//取得特定使用者喜歡的全部內容 
//api/users/:id/likes TODO: 
export const getUserLike = async (userId) => {
  const authToken = localStorage.getItem('authToken') || '';
  try{
    const res = await axios.get(`${baseUrl}/users/${userId}/likes`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      return res.data
  }catch(error){
    console.error('Get Data Failed :', error);
  }
}

//取得特定使用者全部的推文
//GET api/users/:id/tweets 
export const getUserTweets = async (userId) => {
  const authToken = localStorage.getItem('authToken') || '';
  try{
    const res = await axios.get(`${baseUrl}/users/${userId}/tweets`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      return res.data
  }catch(error){
    console.error('Get Data Failed :', error);
  }
}

//修改特定使用者『帳號』資料
//PUT api/users/:id/setting

export const EditUserAccount = async (userId, account, name, email, password, checkPassword) => {
  const authToken = localStorage.getItem('authToken') || '';
  try{
      const response = await axios.put(`${baseUrl}/users/${userId}/setting`,
      {
        name,
        account,
        email,
        password,
        checkPassword
      },{
          headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      return response.data
  }catch(error){
    console.error('Put Data Failed :', error);
  }
}