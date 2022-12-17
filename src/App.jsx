import './App.scss';
import './basicStyle.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReplyPage, MainPage, LoginPage, RegisterPage, AdminLoginPage } from 'pages';
import { AuthProvider } from './contexts/AuthContext';
import { AuthProvider2 } from './contexts/AdminAuthContext';


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="*" element={<ReplyPage />} />
            <Route path="main" element={<MainPage />} />
            <Route path="reply" element={<ReplyPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Routes>
        </AuthProvider>
        <AuthProvider2>
          <Routes>
            <Route path="admin" element={<AdminLoginPage />} />
          </Routes>
        </AuthProvider2>
      </BrowserRouter>
    </div>
  );
}

export default App;
