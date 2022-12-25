import style from './AdminLoginPage.module.scss';
import logo from '../../assets/images/ACLogoIcon.svg';
import AuthInput from '../../components/Common_/AuthInput';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { adminLogin } from '../../api/auth';
import Swal from 'sweetalert2';

const AdminLoginPage = () => {
  const [account, setAdminAccount] = useState('');
  const [password, setAdminPassword] = useState('');
  const navigate = useNavigate();
  const handleClick = async () => {
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    try {
      const data = await adminLogin({
        account,
        password,
      });
      const authToken = data.data;
      if (data.success) {
        localStorage.setItem('authToken', authToken);
        // 登入成功訊息
        Swal.fire({
          position: 'top',
          title: '登入成功！',
          timer: 1000,
          icon: 'success',
          showConfirmButton: false,
        });
        navigate('/admin/main');
        return;
      }
    } catch (error) {
      console.error(error);
    }

    // 登入失敗訊息
    Swal.fire({
      position: 'top',
      title: '登入失敗！',
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    });
  };

  return (
    <div className={style.adminLogin_container}>
      <div>
        <img src={logo} alt="title" className={style.logo} />
      </div>
      <h3 className={style.loginTitle}>後台登入</h3>

      <div className={style.inputContent}>
        <AuthInput
          label={'帳號'}
          value={account}
          placeholder={'請輸入帳號'}
          onChange={(accountInputValue) => setAdminAccount(accountInputValue)}
        />
      </div>

      <div className={style.inputContent}>
        <AuthInput
          type="password"
          label={'密碼'}
          value={password}
          placeholder={'請輸入密碼'}
          onChange={(passwordInputValue) =>
            setAdminPassword(passwordInputValue)
          }
        />
      </div>

      <button className={style.authButton} onClick={handleClick}>
        登入
      </button>
      <div className={style.linkRouter}>
        <Link to="/login" className={style.link}>
          <span>前台登入</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminLoginPage;
