import style from './UserPost.module.scss'
import { avatar } from '../../assets/images/index';

const UserPost = ({onChange, value, onSubmit}) => {
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