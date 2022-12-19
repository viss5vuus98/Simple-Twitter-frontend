import style from './LoginPage.module.css';
import logo from '../../assets/images/ACLogoIcon.svg';
import AuthInput from '../../components/Common_/AuthInput';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../../api/auth';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }

    const data = await login({
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
      navigate('/main');
      return;
    }

    //else if (data.error) {
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
    <div className={style.login_container}>
      <div>
        <img src={logo} alt="title" className={style.logo} />
      </div>
      <h3>登入 Alphitter</h3>

      <div>
        <AuthInput
          label={'帳號'}
          value={account}
          placeholder={'請輸入帳號'}
          onChange={(nameInputValue) => setAccount(nameInputValue)}
        />
      </div>

      <div>
        <AuthInput
          type="password"
          label={'密碼'}
          value={password}
          placeholder={'請輸入密碼'}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </div>

      <button className={style.authButton} onClick={handleClick}>
        登入
      </button>

      <div className={style.linkRouter}>
        <Link to="/register">
          <span>註冊</span>
        </Link>
        <span>・</span>
        <Link to="/admin">
          <span>後台登入</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
