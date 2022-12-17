import style from './TweetItem.module.scss';
import avatar from '../../assets/images/Block@2x-2.png';
import Vector from '../../assets/images/Vector.svg';
import Like from '../../assets/images/Like.svg';
import React from 'react';

type TweetItemProps = {
  id: number,
  description: string,
  createdAt: DateTime,
  updatedAt: DateTime,
  userId: number,
  userName: string,
  userAccount: string,
  replyAmount: number,
  likedAmount: number
};

const TweetItem: React.FC<TweetItemProps> = (prop) => {
  return (
    <div className={style.tweetItem}>
      <div className={style.avatar}>
        <img src={avatar} alt="" />
      </div>
      <div className={style.tweetBody}>
        <div className={style.tweetTitle}>
          <p>Apple</p>
          <span>@apple - 3小時</span>
        </div>
        <p className={style.tweetText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quae
          officiis minima dicta earum iusto cupiditate recusandae enim alias,
          perspiciatis sequi quisquam exercitationem praesentium nostrum sint
        </p>
        <div className={style.tweetControl}>
          <div className={style.vectorSection}>
            <img src={Vector} alt="" className={style.vector} />
            <p>13</p>
          </div>
          <div className={style.likeSection}>
            <img src={Like} alt="" className={style.like} />
            <p>76</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetItem;