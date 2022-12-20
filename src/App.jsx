import './App.scss';
import './basicStyle.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReplyPage, MainPage, LoginPage, RegisterPage, AdminLoginPage, FollowingPage,UserMainPage, UserReplyPage, AdminMainPage, AdminUserPage } from 'pages';
//import { AuthProvider } from './contexts/AuthContext';
//import { AuthProvider2 } from './contexts/AdminAuthContext';


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='test' element={<UserReplyPage/>}/>
          <Route path="main" element={<MainPage />} />
          <Route path="reply" element={<ReplyPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="following" element={<FollowingPage/>}/>
          <Route path="admin" element={<AdminLoginPage />} />
          <Route path='admin/main' element={<AdminMainPage/>}/>
          <Route path='admin/user' element={<AdminUserPage/>}/>
          <Route path="user/self" element={<UserMainPage/>} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
