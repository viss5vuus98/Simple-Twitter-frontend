import style from './followList.module.scss'

const FollowingTab = () => {
  return (
    <section className={style.tabContainer}>
      <div className={`${style.tab} ${true && style.activeTab}`}><span>追隨者</span></div>
      <div className={`${style.tab} ${false && style.activeTab}`}><span>正在追隨</span></div>
    </section>
  )
}

export default FollowingTab