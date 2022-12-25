import style from './userInfo.module.scss';
import { userBanner, userAvatar } from '../../../assets/images/index';
import { useModal } from 'contexts/userContext';
import { Link } from 'react-router-dom';

const UserInfo = ({ userData, onFollow }) => {
  const { handleModalState } = useModal();
  return (
    <section className={style.container}>
      <div className={style.banner}>
        <img
          className={style.image}
          src={!userData.background ? userBanner : userData.background}
          alt="banner "
        />
        <div className={style.avatar}>
          <img
            src={!userData.avatar ? userAvatar : userData.avatar}
            alt="avatar"
          />
        </div>
      </div>
      <div className={style.body}>
        {userData.isSelf ? (
          <div className={style.controlBar}>
            <button
              className={style.setInfoBtn}
              onClick={() => handleModalState?.('editModal')}
            >
              編輯個人資料
            </button>
          </div>
        ) : (
          <div
            className={style.controlBar}
            onClick={() => {
              onFollow?.(userData.id, userData.isFollow);
            }}
          >
            <button
              className={`${style.followBtn} ${
                userData.isFollow && style.isFollowing
              }`}
            >
              {userData.isFollow ? '正在跟隨' : '跟隨'}
            </button>
          </div>
        )}
        <h5 className={style.name}>{userData.name}</h5>
        <p className={style.account}>@{userData.account}</p>
        <p className={style.description}>{userData.introduction}</p>
        <div className={style.footer}>
          <p>
            {userData.followingAmount}
            <span className={style.unit}>個</span>
            <span className={style.type}>
              <Link className={style.link} to={`/follow/${userData.id}`}>
                跟隨中
              </Link>
            </span>
          </p>
          <p>
            {userData.followerAmount}
            <span className={style.unit}>位</span>
            <span className={style.type}>
              <Link className={style.link} to={`/follow/${userData.id}`}>
                追隨者
              </Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
