import { createContext } from 'react';
import { useContext, cteateContext } from 'react';

const ModalContext = createContext('none')

export const ModalContextProvider = ({children, handleModalState, currentTweetId,getTweetId}) => {
  return (
    <ModalContext.Provider value={{handleModalState, currentTweetId, getTweetId}}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const modal = useContext(ModalContext)
  return modal;
}