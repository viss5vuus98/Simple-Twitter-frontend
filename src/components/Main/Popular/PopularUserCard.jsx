import styles from './PopularUserCard.module.css';
import { ReactComponent as UserAvatar } from '../../../assets/images/ACLogoIcon.svg';
import { Link } from 'react-router-dom';
import Button from '../../Common_/Button';
function PopularUserCard(props) {
  const { userName, accountName, id, isFollowed } = props;
  return (
    <div className={styles['container']}>
      <Link to={`/user/${accountName}`}>
        <UserAvatar className={styles['userAvatar']} />
      </Link>
      <div className={styles['userInfo']}>
        <p className={styles['userName']}>
          {userName ? userName : 'Cosmos'}
        </p>
        <p className={styles['userAccount']}>
          {accountName ? `@${accountName}` : '@Cosmos'}
        </p>
      </div>

      <Button currentUserID={1} id={id} isFollowed={isFollowed} />
    </div>
  );
}
export default PopularUserCard;
