//components
import TweetItem from './TweetItem';
//web api
import { changeLike } from '../../api/apis';
import { useModal } from 'contexts/userContext';
import moment from 'moment/moment';

const TweetList = ({tweetData}) => {
    const { currentUser, updateTweetData } = useModal();

  const handleChangeLike = (tweetId, isLike) => {
    const postLikeAsync = async () => {
      try {
        const res = await changeLike(tweetId,  !isLike);
        if(res)
        updateTweetData(
          tweetData.map((tweet) => {
            if (tweet.id === res.id) {
              return {
                ...tweet,
                User: {
                  ...tweet.User,
                },
                isLike: res.islike, //換成response的資料like
                likedAmount: !isLike
                  ? tweet.likedAmount + 1
                  : tweet.likedAmount - 1,
              };
            }
            return { ...tweet, User: { ...tweet.User } };
          }),
        );
      } catch (error) {
        console.error(error);
      }
    };
    postLikeAsync();
  };
  let Tweets = tweetData?.map((item) => {
    const route = item.User.id === currentUser.id ? '/user' : `/user/${item.User.id}`;
    return (
      <TweetItem
        key={item.id}
        tweetData={{
          ...item,
          User: {
            ...item.User,
            route,
          },
          createdAt: moment(item.createdAt).startOf('hour').fromNow(),
        }}
        onChangeLike={handleChangeLike}
      />
    );
  });

  return <>{Tweets}</>;
};

export default TweetList;
