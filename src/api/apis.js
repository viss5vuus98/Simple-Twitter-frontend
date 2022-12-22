import axios from 'axios';

//const baseUrl = 'http://localhost:3000'; //測試用 避免一直抓資料
const baseUrl = 'https://still-cove-80123.herokuapp.com/api';

const authToken = localStorage.getItem('authToken');

//GET api/tweets/following
export const getTweets = async () => {
  try {
    const response = axios.get(`${baseUrl}/tweets/following`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    return response;
  } catch (error) {
    console.error('Get TodoData Failed :', error);
  }
};

//POST Like / unLike
export const chengeLike = async (tweetId, isLike) => {
  const action = isLike ? 'like' : 'unlike'
  try {
      const res = axios.post(`${baseUrl}/tweets/${tweetId}/${action}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        },
      });
      return res
  } catch (error) {
    console.error('[failed]: ', error);
  }
};

//TODO:確認API是否成功取得的值，避免程式沒資料壞掉 確認條件要修
export const checkApiState = (stateCode) => {
  let state = false;
  switch (stateCode) {
    case 'error':
      break;
    case 'success':
      state = true;
      break;
    default:
      break;
  }
  return state;
};

//使用者發Tweet
//POST api/tweets 
export const postTweet = async (value) => {
  try {
    const response = axios({
      method: 'POST',
      url: `${baseUrl}/tweets`,
      responseType: 'json',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        description: value
      }
    });

    return response
  }catch(error){
    console.error('[failed]: ', error)
  }
}



//這裡壞掉
//取得一筆推文詳細
export const getTweetDetail = async (tweetId) => { 
  try {
    //const response = await axios.get(`${baseUrl}api/tweets/following`);
    const response = axios({
      method: 'GET',
      url: `${baseUrl}/tweets/${tweetId}`,
      responseType: 'json',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      return response.data;
    });
  } catch (error) {
    console.error('Get TodoData Failed :', error);
  }
};

//壞掉
//取得一筆推文的全部回文
export const getReplys = async (tweetId) => {
  try {
    //const response = await axios.get(`${baseUrl}api/tweets/following`);
    const response = axios({
      method: 'GET',
      url: `${baseUrl}/tweets/${tweetId}/replies`,
      responseType: 'json',
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Get TodoData Failed :', error);
  }
};

//get adminUser
export const getAdminUser = async () => {
  try {
    const response = await axios.get(`${baseUrl}/admin/users`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('[Get Admin All Users failed]: ', error);
  }
};

//get adminTweet

export const getAdminTweet = async () => {
  try {
    const response = await axios.get(`${baseUrl}/admin/tweets`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('[Get Admin All Tweets failed]: ', error);
  }
};

//del adminTweet

export const delAdminTweet = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/admin/tweets/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('[Delete Admin one Tweet failed]: ', error);
  }
};