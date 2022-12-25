//components
import { NavBar, AdminUserList } from 'components';
//scss
import style from './adminPage.module.scss';
const AdminUserPage = () => {
  return (
    <div className={style.container}>
      <NavBar isAdmin={true} className={style.sideBar} />
      <section className={style.userContainer}>
        <AdminUserList />
      </section>
    </div>
  );
};

export default AdminUserPage;
