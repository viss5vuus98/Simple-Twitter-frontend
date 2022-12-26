import { NavBar } from 'components';
import style from './settingPage.module.scss';
import { useModal } from 'contexts/userContext';
import { useState } from 'react';
import { EditUserAccount } from '../../api/usersApi';
import Swal from 'sweetalert2';
//Route
import { useNavigate } from 'react-router-dom';

const SettingPage = () => {
  const { currentUser, updateCurrentUser } = useModal();
  const [editAccount, setEditAccount] = useState('');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const upLoadUserSet = async () => {
      const sendAccount = editAccount || currentUser.account;
      const sendName = editName || currentUser.name;
      const sendEmail = editEmail || currentUser.email;
      if (password.trim().length <= 0) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          title: `必須輸入密碼`,
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        });
        return;
      }
      if (password !== checkPassword) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          title: '密碼與確認密碼不相同',
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        });
        return;
      }
      if (password.length > 8) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          title: `目前輸入${password.trim().length}碼,密碼字數不可超過8碼`,
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        });
        return;
      }
      try {
        const { account, name, email } = await EditUserAccount(
          currentUser.id,
          sendAccount,
          sendName,
          sendEmail,
          password,
          checkPassword,
        );
        const updateUserData = {
          ...currentUser,
          account,
          name,
          email,
        };
        updateCurrentUser(updateUserData);
        Swal.fire({
          toast: true,
          position: 'top-end',
          title: '修改成功！',
          timer: 1000,
          icon: 'success',
          showConfirmButton: false,
        });
        navigate('/main');
      } catch (error) {
        console.error(error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          title: `修改失敗 原因:${error}`,
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        });
      }
    };
    upLoadUserSet();
  };
  return (
    <div className={style.container}>
      <NavBar isAdmin={false} className={style.sideBar} />
      <section className={style.mainSection}>
        <div className={style.header}>
          <h4 className={style.title}>帳戶設定</h4>
        </div>
        <form className={style.form} action="">
          <div className={style.formControl}>
            <div className={style.text_container}>
              <div className={style.label}>帳號</div>
              <input
                className={style.input}
                type="text"
                defaultValue={editAccount || currentUser.account}
                onChange={(e) => setEditAccount(e.target.value)}
              />
            </div>
            <div className={style.text_container}>
              <div className={style.label}>名稱</div>
              <input
                className={style.input}
                type="text"
                defaultValue={editName || currentUser.name}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className={style.text_container}>
              <div className={style.label}>Email</div>
              <input
                className={style.input}
                type="text"
                defaultValue={editEmail || currentUser.email}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>
            <div className={style.text_container}>
              <div className={style.label}>密碼</div>
              <input
                className={style.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={style.text_container}>
              <div className={style.label}>確認密碼</div>
              <input
                className={style.input}
                type="password"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
              />
            </div>
            <div className={style.formControl}>
              <button
                className={style.submitBtn}
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                儲存
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SettingPage;
