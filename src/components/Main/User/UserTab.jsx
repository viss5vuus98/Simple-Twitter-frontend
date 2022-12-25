import style from './userInfo.module.scss'


const UserTab = ({replyAction, likeAction, tweetAction, tabName}) => {

  return (
    <section className={style.tabContainer}>
      <div className={`${style.tab} ${tabName === 'tweetList' && style.activeTab}`} onClick={()=>{tweetAction('tweetList')}}><span>推文</span></div>
      <div className={`${style.tab} ${tabName === 'replyList' && style.activeTab}`} onClick={()=>{replyAction('replyList')}}><span>回覆</span></div>
      <div className={`${style.tab} ${tabName === 'likeList' && style.activeTab}`} onClick={()=>{likeAction('likeList')}}><span>喜歡的內容</span></div>
    </section>
  )
}

export default UserTab