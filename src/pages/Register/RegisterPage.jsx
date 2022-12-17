import style from './RegisterPage.module.css';
import logo from '../../assets/images/ACLogoIcon.svg';
import AuthInput from '../../components/Common_/AuthInput';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { register } from '../../api/auth';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
   const [account, setAccount] = useState('');
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [checkPassword, setCheckPassword] = useState('');
   const navigate = useNavigate();

   const handleClick = async () => {
     if (account.length === 0) {
       return;
     }
     if (name.length === 0) {
       return;
     }
     if (email.length === 0) {
       return;
     }
     if (password.length === 0) {
      return;
     }
     if (checkPassword.length === 0) {
       return;
     }

     const { success, authToken } = await register({
       account,
       name,
       email,
       password,
       checkPassword,
     });

     if (success) {
       localStorage.setItem('authToken', authToken);
       Swal.fire({
         position: 'top',
         title: '註冊成功！',
         timer: 1000,
         icon: 'success',
         showConfirmButton: false,
       });
       navigate('/login');
       return;
     }
       Swal.fire({
        position: 'top',
        title: '註冊失敗！',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
     });
   };


  return (
    <div className={style.register_container}>
      <div>
        <img src={logo} alt="title" className={style.logo} />
      </div>
      <h3>建立你的帳號</h3>

      <div>
        <AuthInput
          label={'帳號'}
          value={account}
          placeholder={'請輸入帳號'}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
      </div>
      <div>
        <AuthInput
          label={'名稱'}
          value={name}
          placeholder={'請輸入名稱'}
          onChange={(nameInputValue) => setName(nameInputValue)}
        />
      </div>
      <div>
        <AuthInput
          label={'Email'}
          value={email}
          placeholder={'請輸入 email'}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
      </div>
      <div>
        <AuthInput
          type="password"
          label="密碼"
          value={password}
          placeholder="請輸入密碼"
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </div>
      <div>
        <AuthInput
          type="password"
          label="驗證密碼"
          value={checkPassword}
          placeholder="請再次輸入密碼"
          onChange={(checkPasswordInputValue) =>
            setCheckPassword(checkPasswordInputValue)
          }
        />
      </div>

      <button className={style.authButton} onClick={handleClick}>
        註冊
      </button>

      <div className={style.linkToLogin}>
        <Link to="/login">
          <span>取消</span>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
