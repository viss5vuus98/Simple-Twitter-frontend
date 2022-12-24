import style from './UserPost.module.scss'

const UserPost = ({onChange, value, onSubmit, avatar}) => {
  return (
    <form className={style.form}>
      <div className={style.formControl}>
        <div className={style.avatar}>
          <img src={avatar} alt="" />
        </div>
        <input
          className={style.input}
          type="text"
          onChange={(e) => {onChange?.(e.target.value)}}
          value={value}
          placeholder="有什麼新鮮事？"
        />
        <button className={style.btn} 
        onClick={(e) => {
          e.preventDefault();
          onSubmit?.(value)
        }}
        >推文</button>
      </div>
    </form>
  );
}

export default UserPost;