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
        createdAt: '2022-12-07T03:57:27.000Z',
        updatedAt: '2022-12-07T03:57:27.000Z',
        userId: 1,
        userName: 'testName1',
        userAccount: 'testAccount1',
        replyAmount: 25,
        likedAmount: 30,
      },
      {
        id: 2,
        description: 'some example content2',
        createdAt: '2022-12-07T03:57:27.000Z',
        updatedAt: '2022-12-07T03:57:27.000Z',
        userId: 1,
        userName: 'testName2',
        userAccount: 'testAccount2',
        replyAmount: 25,
        likedAmount: 30,
      },
      //使用者追蹤中其他使用者的所有推文，排序由新至舊排序
    ],
  },
};

const TweetList = () => {
  const [tweetData, setTweetData] = useState(dummyData.data.tweets);
  const Tweets = tweetData.map((item) => {
    return <TweetItem key={item.id} {...item}/>;
  });

  return <>{Tweets}</>;
};

export default TweetList;
