import style from './AdminLoginPage.module.css';
import logo from '../../assets/images/ACLogoIcon.svg';
import AuthInput from '../../components/Common_/AuthInput';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { adminLogin } from '../../api/adminAuth';
import Swal from 'sweetalert2';

const AdminLoginPage = () => {
    const [adminAccount, setAdminAccount] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const navigate = useNavigate();

const handleClick = async () => {
  if (adminAccount.length === 0) {
    return;
  }
  if (adminPassword.length === 0) {
    return;
  }

  const { success, authToken } = await adminLogin({
    adminAccount,
    adminPassword,
  });
  if (success) {
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
      <h3>後台登入</h3>

      <div>
        <AuthInput
          label={'帳號'}
          value={adminAccount}
          placeholder={'請輸入帳號'}
          onChange={(adminAccountInputValue) =>
            setAdminAccount(adminAccountInputValue)
          }
        />
      </div>

      <div>
        <AuthInput
          type="password"
          label={'密碼'}
          value={adminPassword}
          placeholder={'請輸入密碼'}
          onChange={(adminPasswordInputValue) =>
            setAdminPassword(adminPasswordInputValue)
          }
        />
      </div>

      <button className={style.authButton} onClick={handleClick}>
        登入
      </button>
      <div className={style.linkRouter}>
        <Link to="/login">
          <span>前台登入</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminLoginPage;
