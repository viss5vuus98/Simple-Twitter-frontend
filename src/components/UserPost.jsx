import style from './UserPost.module.scss'

const UserPost = ({pageTitle}) => {
  return (
      <form className={style.form}>

        <div className={style.formControl}>
          <div className={style.avatar}>
            <img src="" alt="" />
          </div>
            <input className={style.input} type="text"placeholder='有什麼新鮮事？'/>
            <button className={style.btn}>推文</button>
        </div>
      </form>
  );
}

export default UserPost;