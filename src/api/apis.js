import axios from 'axios';

const baseUrl = 'http://localhost:3000'; //測試用 避免一直抓資料
//const baseUrl = 'https://still-cove-80123.herokuapp.com/api';
//GET api/tweets/following
export const getTweets = async () => {
  try {
    //const response = await axios.get(`${baseUrl}api/tweets/following`);
    const response = axios({
      method: 'GET',
      url: baseUrl,
      responseType: 'json',
      headers: {
        Authorization: `Bearer `,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Get TodoData Failed :', error);
  }
};

//POST Like / unLike
export const chengeLike = async (tweetId, isLike) => {
  const action = isLike ? 'like' : 'unlike'
  let authToken = ''
  //TODO: GET TOKEN 後面在補
  try {
      axios.post(`${baseUrl}tweets/${tweetId}/${action}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
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