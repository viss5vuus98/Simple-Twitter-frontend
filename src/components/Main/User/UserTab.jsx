import style from './userInfo.module.scss'

const UserTab = () => {
  return (
    <section className={style.tabContainer}>
      <div className={`${style.tab} ${true && style.activeTab}`}><span>推文</span></div>
      <div className={`${style.tab} ${false && style.activeTab}`}><span>回覆</span></div>
      <div className={`${style.tab} ${false && style.activeTab}`}><span>喜歡的內容</span></div>
    </section>
  )
}

export default UserTab