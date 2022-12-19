import styles from './Button.module.css';
function Button(props) {
 
  const { currentUserID, id, isFollow } = props;
  return Number(currentUserID) === Number(id) ? (
    <div>是本人</div>
  ) : !isFollow ? (
    <button className={styles['followBtn']}>跟隨</button>
  ) : (
    <button className={styles['followingBtn']}>正在跟隨</button>
  );
}
export default Button;
