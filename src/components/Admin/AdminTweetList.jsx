import style from './adminTweet.module.scss';
//asset
//import { avatar } from '../../assets/images/index';
import close from '../../assets/images/closeGray.svg';
import { useState, useEffect } from 'react';
import { getAdminTweet, delAdminTweet } from '../../api/apis';
import Swal from 'sweetalert2';

function AdminTweetList(props) {
  const { tweetID, description, createdAt, userName, avatar, onDelete } = props;

  return (
    <div className={style.tweetItem}>
      <div className={style.avatar}>
        <img src={avatar} alt="" />
      </div>
      <div className={style.tweetBody}>
        <div className={style.tweetTitle}>
          <p>{userName}</p>
          <span>{createdAt}</span>
        </div>
        <p className={style.tweetText}>
          {description}
          {description.length > 50
            ? description.slice(0, 50) + '...'
            : description}
        </p>
      </div>
      <div className={style.delete}>
        <button
          className={style.close}
          style={{ backgroundImage: `url(${close})` }}
          onClick={() => onDelete?.(tweetID)}
        ></button>
      </div>
    </div>
  );
}

function AdminTweetPage() {
  const [tweetList, setTweetList] = useState([]);
  const [deleteTrigger, setDeleteTrigger] = useState(false);

  const getAllTweetsAsync = async () => {
    try {
      const data = await getAdminTweet();
      setTweetList(data);
      setDeleteTrigger(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (tweetID) => {
    try {
      await delAdminTweet(tweetID);
      setDeleteTrigger(true);
      Swal.fire({
        title: '刪除成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
        position: 'top',
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTweetsAsync();
  }, []);

  if (deleteTrigger) {
    getAllTweetsAsync();
  }

  return (
    <div className={style.container}>
      <div className={style.title}>推文清單</div>
      <div className={style.tweetList}>
        {tweetList.map((tweet) => (
          <AdminTweetList
            key={tweet.id}
            tweetID={tweet.id}
            //userAccount={tweet.User.account}
            userName={tweet.User.name}
            avatar={tweet.User.avatar}
            createdAt={tweet.createdAt}
            description={tweet.description}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminTweetPage;
