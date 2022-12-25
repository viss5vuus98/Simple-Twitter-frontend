import style from './tweetModal.module.scss'
import close from '../../assets/images/close.svg'
import { useState } from 'react';
import { postTweet } from '../../api/apis'
import { useModal } from 'contexts/userContext';
import Swal from 'sweetalert2';
const TweetModal = ({isHidden, onCloseModal}) => {
  const [ input, setInput ] = useState('')
  const { handleModalState, currentUser, updateTweetData, tweetData } =
    useModal();

  const handleSubmit =  (value) => {
    if(value.trim().length <= 0 ){
      return;
    }
    const postTweetAsync = async () => {
      const { id, description, createdAt, updatedAt, UserId } = await postTweet(value)
      const updateData = {
        id,
        description,
        createdAt,
        updatedAt,
        UserId,
        User: {
          userId: UserId,
          userName: currentUser.name,
          userAccount: currentUser.account,
        },
        replyAmount: 0,
        likedAmount: 0,
        isLike: false,
      };
      updateTweetData([updateData, ...tweetData]);
    }
    postTweetAsync()
  }

  return (
    <>
      <section className={`${!isHidden && style.hidden} ${style.modal}`}>
        <div className={style.modalHeader}>
          <button
            className={style.close}
            style={{ backgroundImage: `url(${close})` }}
            onClick={() => {
              setInput('');
              onCloseModal?.('none');
            }}
          ></button>
        </div>
        <form className={style.form}>
          <div className={style.formControl}>
            <div className={style.avatar}>
              <img src={currentUser.avatar || ''} alt="" />
            </div>
            <textarea
              className={style.input}
              type="text"
              placeholder="有什麼新鮮事？"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button
              className={style.submitBtn}
              onClick={async (e) => {
                e.preventDefault();
                await handleSubmit(input);
                setInput('');
                handleModalState('none');
                Swal.fire({
                  toast: true,
                  position: 'top-end',
                  title: '發推特成功！',
                  timer: 1000,
                  icon: 'success',
                  showConfirmButton: false,
                });
              }}
            >
              推文
            </button>
          </div>
        </form>
      </section>
      <div className={`${!isHidden && style.hidden} ${style.overlay}`}></div>
    </>
  );
}

export default TweetModal