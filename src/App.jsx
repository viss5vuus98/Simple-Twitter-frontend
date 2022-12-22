import './App.scss';
import './basicStyle.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReplyPage, MainPage, LoginPage, RegisterPage, AdminLoginPage, FollowingPage,UserMainPage, UserReplyPage, AdminMainPage, AdminUserPage, Layout } from 'pages';
//import { AuthProvider } from './contexts/AuthContext';
//import { AuthProvider2 } from './contexts/AdminAuthContext';


function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path='test' element={<UserReplyPage/>}/>
          <Route path="main" element={<MainPage />} />
          <Route path="main/reply/:id" element={<ReplyPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="following" element={<FollowingPage/>}/>
          <Route path="admin" element={<AdminLoginPage />} />
          <Route path='admin/main' element={<AdminMainPage/>}/>
          <Route path='admin/user' element={<AdminUserPage/>}/>
          <Route path="user/self" element={<UserMainPage/>} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
