import FollowingCard from "./FollowingCard";

const FollowingList = ({ followData, onClick }) => {
  const follows = followData.map((item) => {
    return (
      <FollowingCard
        key={item.id}
        id={item.id}
        avatar={item.avatar}
        introduction={item.introduction}
        isFollowed={item.isFollow}
        name={item.name}
        onClick={onClick}
      />
    );
  });

  return <>{follows}</>;
};

export default FollowingList