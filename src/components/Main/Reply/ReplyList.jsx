import ReplyCard from './ReplyCard';
import moment from 'moment/moment';
import { useModal } from 'contexts/userContext';

const ReplyList = ({ replyData }) => {
  const { currentUser } = useModal();
  const replyItems = replyData.map((item) => {
    return (
      <ReplyCard
        key={item.id}
        replyData={{
          ...item,
          User: {
            ...item.User,
            route:
              currentUser.id === item.User.id
                ? '/user'
                : `user/${item.User.id}`,
          },
          createdAt: moment(item.createdAt).toNow(),
        }}
      />
    );
  });
  return <>{replyItems}</>;
};

export default ReplyList;
