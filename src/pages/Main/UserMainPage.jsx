import { UserInfo, UserTab, TweetList, ReplyList } from "components";
import style from './midContent.module.scss'
import { useState, useEffect } from 'react';
//API
import { getTweets } from '../../api/apis'
import { getUserReplies, getUserLike, getUserTweets, getUserInfo, followShip, unFollowShip } from '../../api/usersApi'
//icon
import { arrow } from '../../assets/images/index';
//Route
import { useNavigate,useParams } from "react-router-dom";
//Context
import { useModal } from "contexts/userContext";

const UserMainPage = () => {
  const [ tweetData, setTweetData ] = useState([])
  const [ activeTab, setActiveTab ] = useState('tweetList')
  const [ userData, setUserData ] = useState({})
  const currentUserId = localStorage.getItem('userId') || ''
  //TODO:抽共用元件
  let navigate = useNavigate();
    //取得動態參數
  let { id } = useParams();

  const handleGetUserReply = (value) => {
    let userId;
    if(!id){
      userId = currentUserId
    }else{
      userId = id
    }
    setActiveTab(value)
    const getUserReplyAsync = async () => {
      try{
        const data = await getUserReplies(userId)
        setTweetData([...data])
      }catch(error){
        console.error(error)
      }      
    }
    getUserReplyAsync()
  }

  const handleGetUserLike = (value) => {
    let userId;
    if(!id){
      userId = currentUserId
    }else{
      userId = id
    }
    setActiveTab(value)
    const getUserLikeAsync = async () => {
      try{
        const data = await getUserLike(userId)
        setTweetData([...data])
      }catch(error){
        console.error(error)
      }     
    }
    getUserLikeAsync()
  }

    const handleGetUserTweets = (value) => {
    let userId;
    if(!id){
      userId = currentUserId
    }else{
      userId = id
    }
    setActiveTab(value)
    const getUserTweetsAsync = async () => {
      try{
        const data = await getUserTweets(userId)
        setTweetData([...data])
      }catch(error){
        console.error(error)
      }     
    }
    getUserTweetsAsync()
  }

  //追蹤按鈕事件處理
  const handleClick = (userId, isFollow) => {
    const followShipAsync = async () => {
        const data = await followShip(userId)
        if(!data){
        return
         }
        setData(data)
      }
    const unFollowShipAsync = async () => {
      const data = await unFollowShip(userId)
      if(!data){
        return
      }
      setData(data)
    }
    const setData = (data) => {
      const currentUsers = {
        ...userData,
        isfollow: data.isfollow
      }
      setUserData(currentUsers)
    }
    if(!isFollow){
      followShipAsync()
    }else {
      unFollowShipAsync()
    }
  }

  useEffect(() => {
    const getTweetsAsync = async () => {
      try {
        const tweets = await getTweets();
        setTweetData([...tweets.data])
      } catch (error) {
        console.error(error);
      }
    };
    getTweetsAsync();
  }, []);

  useEffect(() => {
    const getUserDataAsync = async () => {
      let userId;
      if(!id){
        userId = currentUserId
      }else{
        userId = id
      }
      try{
        const data = await getUserInfo(userId)
        setUserData({...data})
      }catch(error){
        console.error(error)
      }
    }
    getUserDataAsync()
  }, [currentUserId, id])
  
  return (
    <>
      <div 
      className={style.header}
      onClick={()=> {navigate(-1)}}
      >
        <img className={style.arrow} src={arrow} alt="" />
        <div className={style.self}>
          <h5 className={style.userName}>Joho Doe</h5>
          <p className={style.tweetCount}>25 推文</p>
        </div>        
      </div>
    <UserInfo userData={userData} onFollow={handleClick}/>
    <UserTab 
    replyAction={handleGetUserReply}
    likeAction={handleGetUserLike}
    tweetAction={handleGetUserTweets} 
    tabName={activeTab}/>
    { !(activeTab === 'replyList') && <TweetList tweetData={tweetData} setTweetData={setTweetData}/> }
    {activeTab === 'replyList' && <ReplyList replyData={tweetData}/>}
    </>
  )
}

export default UserMainPage;