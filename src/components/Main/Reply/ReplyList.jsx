import ReplyCard from "./ReplyCard";
import { useEffect, useState } from "react";
import { getReplys, checkApiState} from '../../../api/apis';
const ReplyList = ({tweetId}) => {
  const [ replyList, setReplyList ] = useState([])
    const replyItems = replyList.map(item => {
      return (
        <ReplyCard key={item.id} replyData={{...item}}/>
      )
    })
    useEffect(() => {
    const getReplyAsync = async () => {
      console.log('post')
      try {
        const replys = await getReplys(504);
        if (checkApiState('error')) {
          setReplyList(replys);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getReplyAsync();
  }, []);
  return (
    <>
     {replyItems}
    </>
  );
}

export default ReplyList;