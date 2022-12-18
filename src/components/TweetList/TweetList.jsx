//hook
import { useState, useEffect } from 'react';
//components
import TweetItem from './TweetItem';
//web api
import { getTweets, checkApiState, chengeLike } from '../../api/apis';

const dummyData = {
  status: 'success',
  data: {
    tweets: [
      {
        id: 1,
        description: 'voluptas',
        UserId: 5,
        createdAt: '2022-12-16T11:24:49.000Z',
        updatedAt: '2022-12-17T11:24:49.000Z',
        User: {
          id: 5,
          name: 'user4',
          account: 'user4',
          avatar:
            'https://image.damanwoo.com/files/styles/rs-big/public/flickr/4/3151/5820170825_59418deec8_o.jpg',
        },
        replyAmount: 3,
        likedAmount: 0,
      },
      {
        id: 2,
        description: 'volupta lorem lorem lorem',
        UserId: 6,
        createdAt: '2022-12-16T11:24:49.000Z',
        updatedAt: '2022-12-17T11:24:49.000Z',
        User: {
          id: 6,
          name: 'user5',
          account: 'user5',
          avatar:
            'https://image.damanwoo.com/files/styles/rs-big/public/flickr/4/3151/5820170825_59418deec8_o.jpg',
        },
        replyAmount: 3,
        likedAmount: 0,
      },
      //使用者追蹤中其他使用者的所有推文，排序由新至舊排序
    ],
  },
};

const TweetList = () => {
  const [tweetData, setTweetData] = useState(dummyData.data.tweets);

  const handleChangeLike = (tweetId) => {
    const isLike = tweetData.filter((tweet) => (tweet.id = tweetId)).isLike;
    const postLikeAsync = async () => {
      try {
        if (isLike) {
          await chengeLike({ tweetId });
        } else {
          await chengeLike({ tweetId }); //unlike
        }
        setTweetData(
          tweetData.map((tweet) => {
            if (tweet.id === tweetId) {
              return {
                ...tweet,
                isLike: !isLike, //換成response的資料like
              };
            }
            return tweet;
          }),
        );
      } catch (error) {
        console.error(error);
      }
    };
    postLikeAsync();
  };
  useEffect(() => {
    const getTweetsAsync = async () => {
      try {
        const tweets = await getTweets();
        if (checkApiState('error')) {
          setTweetData(tweets);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getTweetsAsync();
  }, []);
  const Tweets = tweetData.map((item) => {
    return (
      <TweetItem key={item.id} {...item} onChangeLike={handleChangeLike} />
    );
  });

  return <>{Tweets}</>;
};

export default TweetList;
