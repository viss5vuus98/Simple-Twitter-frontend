import style from './replyModal.module.scss';
import close from '../../assets/images/close.svg';
import { useEffect, useState } from 'react';
import { useModal } from 'contexts/userContext';
import { postReply, getTweetDetail } from '../../api/apis';
import Swal from 'sweetalert2';
const ReplyModal = ({ isHidden, onCloseModal }) => {
  const [input, setInput] = useState();
  const [userData, setUserData] = useState('');
  const [tweetData, setTweetData] = useState({
    id: 1,
    description:
      'Nobis omnis reiciendis sapiente odio quam. Qui vitae accusantium et non porro et tempore. Dolores voluptas magni ratione amet soluta quia suscipit eum non.',
    UserId: 2,
    createdAt: '2022-12-17T18:18:01.000Z',
    updatedAt: '2022-12-17T18:18:01.000Z',
    User: {
      id: 2,
      name: 'user1',
      account: 'user1',
      avatar: null,
    },
    replyAmount: 3,
    likeAmount: 3,
  });
  //取得動態參數
  const { currentTweetId, currentUser } = useModal();

  const handleSubmit = async (value) => {
    if (value.trim().length <= 0) {
      Swal.fire({
        position: 'top',
        title: '請輸入回文內容',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
      return;
    }
    if (value.length > 100) {
      Swal.fire({
        position: 'top',
        title: '回文內容不可超過一百個字',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
      return;
    }
    try {
      await postReply(value, currentTweetId);
      setInput('');
      onCloseModal?.('none');
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const getTweetDetailAsync = async () => {
      if (currentTweetId === 0) {
        return;
      }
      try {
        const data = await getTweetDetail(currentTweetId);
        setTweetData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getTweetDetailAsync();
  }, [currentTweetId]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const avatar = currentUser.avatar || '';
    setUserData(avatar);
  }, [currentUser]);

  return (
    <>
      <section className={`${!isHidden && style.hidden} ${style.modal}`}>
        <div className={style.modalHeader}>
          <button
            className={style.close}
            style={{ backgroundImage: `url(${close})` }}
            onClick={() => {
              onCloseModal?.('none');
              setInput('');
            }}
          ></button>
        </div>
        <div className={style.tweetItem}>
          <div className={style.avatar}>
            <img src={tweetData.User.avatar || ''} alt="" />
          </div>
          <div className={style.tweetBody}>
            <div className={style.tweetTitle}>
              <p>{tweetData.User.name || ''}</p>
              <span>
                @{tweetData.User.account || ''} {tweetData.createdAt || ''}
              </span>
            </div>
            <p className={style.tweetText}>{tweetData.description || ''}</p>
            <div className={style.replyTarget}>
              <span>回覆給 </span>
              <span className={style.link}>
                @{tweetData.User.account || ''}
              </span>
            </div>
          </div>
          <div className={style.connectLine}></div>
        </div>
        <form className={style.form}>
          <div className={style.formControl}>
            <div className={style.replyAvatar}>
              <img src={userData} alt="" />
            </div>
            <textarea
              className={style.input}
              type="text"
              placeholder="想要說什麼？"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className={style.submitControl}>
            <button
              className={style.submitBtn}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(input);
              }}
            >
              回文
            </button>
          </div>
        </form>
      </section>
      <div className={`${!isHidden && style.hidden} ${style.overlay}`}></div>
    </>
  );
};

export default ReplyModal;
