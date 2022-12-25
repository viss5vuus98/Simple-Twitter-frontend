import './App.scss';
import './basicStyle.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReplyPage, MainPage, LoginPage, RegisterPage, AdminLoginPage, FollowingPage,UserMainPage, AdminMainPage, AdminUserPage, Layout, SettingPage } from 'pages';
//import { AuthProvider } from './contexts/AuthContext';
//import { AuthProvider2 } from './contexts/AdminAuthContext';


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="main" element={<MainPage />} />
            <Route path="reply/:id" element={<ReplyPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="following" element={<FollowingPage />} />
            <Route path="user" element={<UserMainPage />} />
            <Route path="user/:id" element={<UserMainPage />} />
            <Route path="setting" element={<SettingPage />} />
            <Route path="admin" element={<AdminLoginPage />} />
            <Route path="admin/main" element={<AdminMainPage />} />
            <Route path="admin/user" element={<AdminUserPage />} />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
