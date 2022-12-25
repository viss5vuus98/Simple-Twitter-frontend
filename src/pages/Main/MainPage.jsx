//components
import { TweetList, UserPost, NavBar, PopularUserList } from 'components';
//scss
import style from './midContent.module.scss';
//hook
import { useState, useEffect } from 'react';
import { postTweet, getTweets } from '../../api/apis'
//useContext
import { useModal } from 'contexts/userContext';
//
import Swal from 'sweetalert2';
const MainPage = () => {
  const [ userInput, setUserInput ] = useState('')
  const { currentUser, updateTweetData, tweetData } = useModal();
  
  useEffect(() => {
    const getTweetsAsync = async () => {
      try {
        const tweets = await getTweets();
        setUserInput('')
        updateTweetData(tweets);
      } catch (error) {
        console.error(error);
        Swal.fire({
          position: 'top',
          title: '更新推特資料失敗',
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        });
      }
    };
    getTweetsAsync();
  }, []);

  const handleChange = (value) => {
    if(value.length >= 120 ){
      Swal.fire({
        position: 'top',
        title: '超過推文字數限制',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
      return
    }
    setUserInput(value)
  }
  const handleSubmit = async (value) => {
    if(value.trim().length <= 0 ){
      Swal.fire({
        position: 'top',
        title: '請輸入推文內容',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
      return;
    }
    setUserInput('');
    const { id, description, createdAt, updatedAt, UserId } = await postTweet(value);
    //用回傳的資料更新TweetData
    const updateData = {
      id,
      description,
      createdAt,
      updatedAt,
      UserId,
      User: {
        id: UserId,
        name: currentUser.name,
        account: currentUser.account,
        avatar: currentUser.avatar,
        route: '/user'
      },
      replyAmount: 0,
      likedAmount: 0,
      isLike: false,
    };
    updateTweetData([updateData, ...tweetData]);
  }


  return (
    <div className={style.container}>
      <NavBar isAdmin={false} className={style.sideBar} />
      <section className={style.mainSection}>
        <div className={style.header}>
          <h4 className={style.title}>首頁</h4>
        </div>
        <UserPost
          onChange={handleChange}
          value={userInput}
          onSubmit={handleSubmit}
          avatar={currentUser.avatar || ''}
        />
        <TweetList tweetData={tweetData} />
      </section>
      <PopularUserList className={style.rightContent} />
    </div>
  );
};

export default MainPage;
