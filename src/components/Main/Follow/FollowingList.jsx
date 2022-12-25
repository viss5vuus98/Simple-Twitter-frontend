import FollowingCard from "./FollowingCard";

const FollowingList = ({ followData }) => {
  const follows = followData.map( item =>{
    return (
      <FollowingCard
        key={item.id}
        id={item.id}
        avatar={item.avatar}
        introduction={item.introduction}
        isFollowed={item.isFollowed}
        name={item.name}
      />
    );
  })

  return (<>{follows}</>)
};

export default FollowingList