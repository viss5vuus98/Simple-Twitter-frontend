import { useContext,createContext } from 'react';

const ModalContext = createContext('none')


export const ModalContextProvider = ({children, handleModalState, currentTweetId, getTweetId, onLogin, userData }) => {
  return (
    <ModalContext.Provider value={{handleModalState, currentTweetId, getTweetId, onLogin, userData}}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const modal = useContext(ModalContext)
  return modal;
}
