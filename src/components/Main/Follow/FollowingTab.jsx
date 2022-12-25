import style from './followList.module.scss'

const FollowingTab = ({ getFollowings, grtFollowers, tabState }) => {
  return (
    <section className={style.tabContainer}>
      <div
        className={`${style.tab} ${
          tabState === 'Followers' && style.activeTab
        }`}
        onClick={() => {
          grtFollowers();
        }}
      >
        <span>追隨者</span>
      </div>
      <div
        className={`${style.tab} ${
          tabState === 'Followings' && style.activeTab
        }`}
        onClick={() => {
          getFollowings();
        }}
      >
        <span>正在追隨</span>
      </div>
    </section>
  );
};

export default FollowingTab