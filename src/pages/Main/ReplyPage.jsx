import { ReplyList, TweetDetail } from 'components';
import { arrow } from '../../assets/images/index';
import style from './midContent.module.scss'
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getTweetDetail} from '../../api/apis';

const ReplyPage = ({matches}) => {
  const [ tweetData, setTweetData ] = useState({
    id: 0,
    description: "",
    UserId: 0,
    createdAt: "2022-12-17T18:18:01.000Z",
    updatedAt: "2022-12-17T18:18:01.000Z",
    User: {
        id: 0,
        name: "user",
        account: "user1",
        avatar: ''
    },
    replyAmount: 3,
    likeAmount: 3
  })
  let { id } = useParams();
  useEffect( () => {
    const getTweetDetailAsync = () => {
      try{
        const data = getTweetDetail(504)
        console.log(data)
      }catch(error){
        console.error(error)
      }
    } 
    getTweetDetailAsync();
  }, [])


  return (
    <>
      <div className={style.header}>
        <img className={style.arrow} src={arrow} alt="" />
        <h4 className={style.title}>推文</h4>
      </div>
      <TweetDetail tweetData={tweetData}/>
      <ReplyList tweetId={id}/>
    </>
  );
}

export default ReplyPage;