//components
import TweetItem from './TweetItem';
//web api
import { chengeLike } from '../../api/apis';


const TweetList = ({tweetData, setTweetData}) => {

  const handleChangeLike = (tweetId) => {
    console.log(tweetId)
    const isLike = tweetData.filter((tweet) => (tweet.id = tweetId)).isLike;
    const postLikeAsync = async () => {
      try {
        const res = await chengeLike(tweetId,  isLike);
        console.log(res)
        // setTweetData(
        //   tweetData.map((tweet) => {
        //     if (tweet.id === tweetId) {
        //       return {
        //         ...tweet,
        //         isLike: !isLike, //換成response的資料like
        //       };
        //     }
        //     return tweet;
        //   }),
        // );
      } catch (error) {
        console.error(error);
      }
    };
    postLikeAsync();
  };
  const Tweets = tweetData.map((item) => {
    return (
      <TweetItem key={item.id} {...item} onChangeLike={handleChangeLike} />
    );
  });

  return <>{Tweets}</>;
};

export default TweetList;
