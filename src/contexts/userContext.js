import { useContext, createContext } from 'react';

const ModalContext = createContext('none');

export const ModalContextProvider = ({
  children,
  handleModalState,
  currentTweetId,
  getTweetId,
  onLogin,
  userData,
  adminLayout,
  changePop,
  currentUser,
  updateTweetData,
  tweetData,
  onLogout,
  updateCurrentUser,
  recommendUsers,
  setRecommendUsers,
}) => {
  return (
    <ModalContext.Provider
      value={{
        handleModalState,
        currentTweetId,
        getTweetId,
        onLogin,
        userData,
        adminLayout,
        changePop,
        currentUser,
        updateTweetData,
        tweetData,
        onLogout,
        updateCurrentUser,
        recommendUsers,
        setRecommendUsers,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const modal = useContext(ModalContext);
  return modal;
};
