//components
import TweetItem from './TweetItem';
//web api
import { chengeLike } from '../../api/apis';


const TweetList = ({tweetData, setTweetData}) => {

  const handleChangeLike = (tweetId, isLike) => {
    const postLikeAsync = async () => {
      try {
        const res = await chengeLike(tweetId,  !isLike);
        if(res)
        setTweetData(
          tweetData.map((tweet) => {
            if (tweet.id === res.id) {
              return {
                ...tweet,
                User: {
                  ...tweet.User
                },
                isLike: res.islike, //換成response的資料like
                likedAmount: (!isLike ? tweet.likedAmount + 1 : tweet.likedAmount -1)
              };
            }
            return {...tweet, User: {...tweet.User}};
          }),
        );
      } catch (error) {
        console.error(error);
      }
    };
    postLikeAsync();
  };
  let Tweets = tweetData.map((item) => {
    return (
      <TweetItem key={item.id} {...item} onChangeLike={handleChangeLike} />
    );
  });

  return <>{Tweets}</>;
};

export default TweetList;
