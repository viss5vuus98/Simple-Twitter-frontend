import './App.scss';
import './basicStyle.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ReplyPage,
  MainPage,
  LoginPage,
  RegisterPage,
  AdminLoginPage,
  TestPage,
} from 'pages';
import { AuthProvider } from './contexts/AuthContext';
//import { AuthProvider2 } from './contexts/AdminAuthContext';


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="main" element={<MainPage />} />
            <Route path="reply" element={<ReplyPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<TestPage />} />
            <Route path="admin" element={<AdminLoginPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
