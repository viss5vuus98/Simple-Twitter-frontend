import style from './adminTweet.module.scss'
//asset
import { avatar } from '../../assets/images/index';
import close from '../../assets/images/closeGray.svg'



const AdminTweet = () => {



  return (
    <div className={style.tweetItem}>
      <div className={style.avatar}>
        <img src={avatar} alt="" />
      </div>
      <div className={style.tweetBody}>
        <div className={style.tweetTitle}>
          <p>John</p>
          <span>
            @apple 3小時前
          </span>
        </div>
        <p className={style.tweetText}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus laudantium dolorem nostrum? Distinctio, harum et.</p>
      </div>
      <div className={style.delete}>
        <button className={style.close} style={{ backgroundImage: `url(${close})` }}>
        </button>
      </div>
    </div>
  )
}

export default AdminTweet;






// const AdminTweet = () => {
//   return (
//     <div className={style.tweetItem}>
//       <div className={style.avatar}>
//         <img src={avatar} alt="" />
//       </div>
//       <div className={style.tweetBody}>
//         <div className={style.tweetTitle}>
//           <p>John</p>
//           <span>
//             @apple 3小時前
//           </span>
//         </div>
//         <p className={style.tweetText}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus laudantium dolorem nostrum? Distinctio, harum et.</p>
//       </div>
//       <div className={style.delete}>
//         <button className={style.close} style={{ backgroundImage: `url(${close})` }}>
//         </button>
//       </div>
//     </div>
//   )
// }

// export default AdminTweet;