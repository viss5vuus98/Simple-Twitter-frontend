import style from './replyModal.module.scss'
import { avatar } from '../../assets/images/index';
import close from '../../assets/images/close.svg'
import { useState } from 'react';
import { useModal } from 'contexts/userContext';
import { postReply } from '../../api/apis'

const ReplyModal = ({isHidden, onCloseModal}) => {
  const [ input, setInput ] = useState()
  //取得動態參數
  const { currentTweetId } = useModal()

  const handleSubmit = async (value) => {
    try{
      await postReply(value, currentTweetId)
      setInput('')
      onCloseModal?.('none')
    }catch(error){

    }
  }

  return (
    <>
      <section className={`${!isHidden && style.hidden} ${style.modal}`}>
        <div className={style.modalHeader}>
            <button className={style.close} style={{ backgroundImage: `url(${close})` }}
            onClick={() => {
              onCloseModal?.('none')
              setInput('')
            }}            
            ></button>
        </div>
        <div className={style.tweetItem}>
          <div className={style.avatar}>
            <img src={avatar} alt="" />
          </div>
          <div className={style.tweetBody}>
            <div className={style.tweetTitle}>
              <p>Apple</p>
              <span>
                @apple 3小時
              </span>
            </div>
            <p className={style.tweetText}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. magnam. Eveniet quisquam impedit ut similique voluptates eum porro iure.</p>
            <div className={style.replyTarget}>
              <span>回覆給 </span>
              <span className={style.link}>@apple</span>       
            </div>
          </div>
          <div className={style.connectLine}></div>
        </div>
        <form className={style.form}>
          <div className={style.formControl}>
            <div className={style.replyAvatar}>
              <img src={avatar} alt="" />
            </div>
            <textarea
              className={style.input}
              type="text"
              placeholder="想要說什麼？"
              value={input}
              onChange={(e)=>setInput(e.target.value)}
            />
          </div>
          <div className={style.submitControl}>
              <button 
              className={style.submitBtn}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(input)
              }}
              >回文</button>
          </div>
        </form>
      </section>
      <div className={`${!isHidden && style.hidden} ${style.overlay}`}></div>
    </>
  )
}

export default ReplyModal;