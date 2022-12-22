import { ReplyList, TweetDetail } from 'components';
import { arrow } from '../../assets/images/index';
import style from './midContent.module.scss'
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getTweetDetail, getReplys} from '../../api/apis';
import moment from 'moment/moment';
import cnFormat from '../../assets/timeFormat'

moment.locale('zh-tw', cnFormat);


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
  const [ replyList, setReplyList ] = useState([])
  
  //取得動態參數
  let { id } = useParams();
  //DetailData
  useEffect( () => {
    const getTweetDetailAsync = async () => {
      try{
        const data = await getTweetDetail(id);
        setTweetData({...data, createdAt: moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')})
      }catch(error){
        console.error(error)
      }
    } 
    getTweetDetailAsync();
  }, [id])

  //ReplyData
  useEffect(() => {
    const getReplyAsync = async () => {
      try {
        const replys = await getReplys(id);

          setReplyList(replys.map(reply => {
            return ({
              ...reply,
              createdAt: moment(reply.createdAt).startOf('hour').fromNow()
            })
          }));
      } catch (error) {
        console.error(error);
      }
    };
    getReplyAsync();
  }, [id]);

  return (
    <>
      <div className={style.header}>
        <img className={style.arrow} src={arrow} alt="" />
        <h4 className={style.title}>推文</h4>
      </div>
      <TweetDetail tweetData={tweetData}/>
      <ReplyList replyData={replyList}/>
    </>
  );
}

export default ReplyPage;