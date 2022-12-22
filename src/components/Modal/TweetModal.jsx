import style from './tweetModal.module.scss'
import { avatar } from '../../assets/images/index';
import close from '../../assets/images/close.svg'
import { useState } from 'react';
import { postTweet } from '../../api/apis'
import { useModal } from 'contexts/userContext';

const TweetModal = ({isHidden, onCloseModal}) => {
  const [ input, setInput ] = useState('')
  const { handleModalState } = useModal()

  const handleSubmit = async (value) => {
    if(value.trim().length <= 0 ){
      return;
    }
    await postTweet(value)
  }

  return (
    <>
      <section className={`${!isHidden && style.hidden} ${style.modal}`}>
        <div className={style.modalHeader}>
            <button 
            className={style.close} style={{ backgroundImage: `url(${close})` }}
            onClick={() => {
              setInput('');
              onCloseModal?.('none')
            }}
            ></button>
        </div>
        <form className={style.form}>
          <div className={style.formControl}>
            <div className={style.avatar}>
              <img src={avatar} alt="" />
            </div>
            <textarea
              className={style.input}
              type="text"
              placeholder="有什麼新鮮事？"
              value={input}
              onChange={(e) => {setInput(e.target.value)}}
            />
            <button 
            className={style.submitBtn}
            onClick={ async (e) => {
                e.preventDefault();
                await handleSubmit(input)
                handleModalState('none')
                window.location.reload()
            }}
            >推文</button>
          </div>
        </form>
      </section>
      <div className={`${!isHidden && style.hidden} ${style.overlay}`}></div>
    </>
  )
}

export default TweetModal