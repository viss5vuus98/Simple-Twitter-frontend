//components
import TweetItem from './TweetItem';
//web api
import { chengeLike } from '../../api/apis';


const TweetList = ({tweetData, setTweetData}) => {

  const handleChangeLike = (tweetId) => {
    const isLike = tweetData.filter((tweet) => (tweet.id = tweetId)).isLike;
    console.log(isLike)
    const postLikeAsync = async () => {
      try {
        const res = await chengeLike(tweetId,  !isLike);
        // setTweetData(
        //   tweetData.map((tweet) => {
        //     if (tweet.id === tweetId) {
        //       return {
        //         ...tweet,
        //         User: {
        //           ...tweet.User
        //         },
        //         isLike: res.isLike, //換成response的資料like
        //       };
        //     }
        //     return {...tweet};
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
