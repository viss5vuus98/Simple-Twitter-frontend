import axios from 'axios';

//const baseUrl = 'http://localhost:3000'; //測試用 避免一直抓資料
const baseUrl = 'https://still-cove-80123.herokuapp.com/api';

//GET api/tweets
export const getTweets = async () => {
  const authToken = localStorage.getItem('authToken') || '';
  try {
    const response = await axios.get(`${baseUrl}/tweets`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Get Data Failed :', error);
  }
};

//POST Like / unLike
export const changeLike = async (tweetId, isLike) => {
  const authToken = localStorage.getItem('authToken') || '';
  const action = isLike ? 'like' : 'unlike';
  try {
    const res = await axios.post(
      `${baseUrl}/tweets/${tweetId}/${action}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    return res.data;
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
  const authToken = localStorage.getItem('authToken') || '';
  try {
    const response = await axios.post(
      `${baseUrl}/tweets`,
      {
        description: value,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('[failed]: ', error);
  }
};

//取得一筆推文詳細
export const getTweetDetail = async (tweetId) => {
  const authToken = localStorage.getItem('authToken') || '';
  try {
    const response = await axios.get(`${baseUrl}/tweets/${tweetId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
    // const response = await axios({
    //   method: 'GET',
    //   url: `${baseUrl}/tweets/${tweetId}`,
    //   responseType: 'json',
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //   },
    // }).then((res) => {
    //   return res.data
    // })
  } catch (error) {
    console.error('Get TodoData Failed :', error);
  }
};

//取得一筆推文的全部回文
//17.GET api/tweets/:tweet_Id/replies
export const getReplys = async (tweetId) => {
  const authToken = localStorage.getItem('authToken') || '';
  try {
    const response = await axios.get(`${baseUrl}/tweets/${tweetId}/replies`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    // const response = axios({
    //   method: 'GET',
    //   url: `${baseUrl}/tweets/${tweetId}/replies`,
    //   responseType: 'json',
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //   }
    // });
    const { data } = response;
    return data;
  } catch (error) {
    console.error('Get Data Failed :', error);
  }
};

//回覆一則推文
//16.POST api/tweets/:tweet_Id/replies
//comment:string
//tewwtId: int
export const postReply = async (comment, tweetId) => {
  const authToken = localStorage.getItem('authToken') || '';
  try {
    await axios.post(
      `${baseUrl}/tweets/${tweetId}/replies`,
      {
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
  } catch (error) {
    console.error('Post Data Failed :', error);
  }
};

//get adminUser
export const getAdminUser = async () => {
  const authToken = localStorage.getItem('authToken') || '';
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
  const authToken = localStorage.getItem('authToken') || '';
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
  const authToken = localStorage.getItem('authToken') || '';
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
