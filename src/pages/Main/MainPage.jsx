import { TweetList, UserPost } from 'components';
import style from './midContent.module.scss';
import { useState, useEffect } from 'react';
import { postTweet, getTweets } from '../../api/apis'
import { useModal } from 'contexts/userContext';
const MainPage = () => {
  const [ userInput, setUserInput ] = useState('')
  const [ tweetData, setTweetData ] = useState(
    [{
        id: 0,
        description: 'volupta lorem lorem lorem',
        UserId: 0,
        createdAt: '2022-12-16T11:24:49.000Z',
        updatedAt: '2022-12-17T11:24:49.000Z',
        User: {
          id: 0,
          name: 'user5',
          account: 'user5',
          avatar:
            'https://image.damanwoo.com/files/styles/rs-big/public/flickr/4/3151/5820170825_59418deec8_o.jpg',
        },
        replyAmount: 0,
        likedAmount: 0,
      }]
  );
  const { userData } = useModal()
  useEffect(() => {
    const getTweetsAsync = async () => {
      try {
        const tweets = await getTweets();
        setTweetData(tweets.data.map(tweet => {
          return (
            {
              ...tweet,
              User: {
                ...tweet.User,
                route: (userData.id === tweet.User.id ? '/user' : `/user/${tweet.User.id}`)
              }
            }
          )
        }))
        setUserInput('')
      } catch (error) {
        console.error(error);
      }
    };
    getTweetsAsync();
  }, [userData.id]);

  const handleChange = (value) => {
    if(value.length >= 120 ){
      return
    }
    setUserInput(value)
  }
  const handleSubmit = async (value) => {
    if(value.trim().length <= 0 ){
      return;
    }
    await postTweet(value)
    const tweets = await getTweets();
    setTweetData(tweets.data)
  }


  return (
    <section>
      <div className={style.header}>
        <h4 className={style.title}>首頁</h4>
      </div>
      <UserPost onChange={handleChange} value={userInput} onSubmit={handleSubmit} avatar={userData.avatar}/>
      <TweetList tweetData={tweetData} setTweetData={setTweetData}/>
    </section>
  );
};

export default MainPage;
