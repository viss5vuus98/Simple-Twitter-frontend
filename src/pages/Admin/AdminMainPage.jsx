//components
import { NavBar, AdminTweetList } from 'components';
//scss
import style from './adminPage.module.scss';

const AdminMainPage = () => {
  return (
    <div className={style.container}>
    <NavBar isAdmin={true} className={style.sideBar} />
    <section className={style.mainContainer}>
      <AdminTweetList />
    </section>
    </div>
  );
};

export default AdminMainPage;
