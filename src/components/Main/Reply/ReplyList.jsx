import ReplyCard from "./ReplyCard";
import { useEffect, useState } from "react";


const dummyData = [
    {
        "id": 7,
        "comment": "Quisquam ullam odit provident est.",
        "UserId": 3,
        "TweetId": 3,
        "createdAt": "2022-12-16T17:00:04.000Z",
        "updatedAt": "2022-12-16T17:00:04.000Z",
        "tweetId": 3,
        "userId": 3,
        "User": {
            "id": 3,
            "account": "user2",
            "name": "user2",
            "avatar": null
        },
				"repliedAccount": "user1" 
    },
]

const ReplyList = ({replyData}) => {
  const replyItems = replyData.map(item => {
    return (
      <ReplyCard key={item.id} replyData={{...item}}/>
    )
  })
  return (
    <>
      {replyItems}
    </>
  );
}

export default ReplyList;