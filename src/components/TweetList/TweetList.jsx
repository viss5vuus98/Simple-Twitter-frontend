//hook
import { useState } from 'react';
//components
import TweetItem from './TweetItem';

const dummyData = {
  status: 'success',
  data: {
    tweets: [
      {
        id: 1,
        description: 'some example content1',
        createdAt: '2022-12-17T03:57:27.000Z',
        updatedAt: '2022-12-07T03:57:27.000Z',
        userId: 1,
        userName: 'testName1',
        userAccount: 'testAccount1',
        replyAmount: 25,
        likedAmount: 30,
        isLike: true,
      },
      {
        id: 2,
        description: 'some example content2',
        createdAt: '2022-12-07T03:57:27.000Z',
        updatedAt: '2022-12-07T03:57:27.000Z',
        userId: 1,
        userName: 'testName2',
        userAccount: 'testAccount2',
        replyAmount: 2,
        likedAmount: 3,
        lsLike: false,
      },
      //使用者追蹤中其他使用者的所有推文，排序由新至舊排序
    ],
  },
};

const TweetList = () => {
  const [tweetData, setTweetData] = useState(dummyData.data.tweets);

  const onChangeLike = (id) => {
    setTweetData(
      tweetData.map((tweet) => {
        if (tweet.id === id) {
          return {
            ...tweet,
            isLike: !tweet.isLike,
          };
        }
        return tweet;
      }),
    );
  };
  const Tweets = tweetData.map((item) => {
    return <TweetItem key={item.id} {...item} onChangeLike={onChangeLike} />;
  });

  return <>{Tweets}</>;
};

export default TweetList;
