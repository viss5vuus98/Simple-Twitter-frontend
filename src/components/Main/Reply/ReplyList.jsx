import ReplyCard from "./ReplyCard";
import moment from 'moment/moment';

const ReplyList = ({replyData}) => {
  const replyItems = replyData.map(item => {
    return (
      <ReplyCard
        key={item.id}
        replyData={{
          ...item,
          createdAt: moment(item.createdAt).startOf('hour').fromNow(),
        }}
      />
    );
  })
  return (
    <>
      {replyItems}
    </>
  );
}

export default ReplyList;