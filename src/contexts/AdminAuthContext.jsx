import { adminLogin, checkPermission } from '../api/adminAuth';
import { createContext, useState, useEffect } from 'react';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';

const defaultAuthContext = {
  isAuthenticated: false, // 使用者是否登入的判斷依據，預設為 false，若取得後端的有效憑證，則切換為 true
  currentMember: null, // 當前使用者相關資料，預設為 null，成功登入後就會有使用者資料
  adminLogin: null, // 註冊方法
 
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider2 = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }
      const result = await checkPermission(authToken);
      if (result) {
        setIsAuthenticated(true);
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    };

    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.sub,
          name: payload.name,
        },

        //後台登入方法
        adminLogin: async (data) => {
          const { success, authToken } = await adminLogin({
            name: data.adminAccount,
            password: data.adminPassword,
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },

        //登出方法
        // logout: () => {
        // localStorage.removeItem('authToken');
        // setPayload(null);
        // setIsAuthenticated(false);
        // },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
