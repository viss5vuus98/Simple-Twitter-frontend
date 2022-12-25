import FollowingCard from "./FollowingCard";
import style from './followList.module.scss';

function FollowingList(props) {
  const { followerData, followingData, setFollower, setFollowing } =
    props;
  return (
    <div className={style.container}>
      {/* {followerData && followerData.length === 0 && (
        <div className={style.noFollowed}>暫無使用者追隨</div>
      )}
      {followingData && followingData.length === 0 && (
        <div className={style.noFollowing}>暫無追隨使用者</div>
      )} */}
      {followerData &&
        followerData?.map((data) => (
          <FollowingCard
            key={data?.followerId}
            userName={data?.name}
            avatar={data?.avatar}
            description={data?.introduction}
            isFollow={data?.isFollow}
            userID={data.userData.id}
            setSelfFollower={setFollower}
          />
        ))}
      {followingData &&
        followingData?.map((data) => (
          <FollowingCard
            key={data?.followingId}
            userName={data?.name}
            avatar={data?.avatar}
            description={data?.introduction}
            isFollow={data?.isFollowed}
            userID={data.userData.id}
            setSelfFollowing={setFollowing}
          />
        ))}
    </div>
  );
}

export default FollowingList;