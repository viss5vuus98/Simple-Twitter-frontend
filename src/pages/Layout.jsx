import { TweetModal, ReplyModal, EditModal } from 'components';
//hook
import { useEffect, useState, useRef } from 'react';
import { ModalContextProvider } from '../contexts/userContext';
//Route
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { tokenAuthenticate, getUserSelf } from '../api/auth';

const Layout = ({ children }) => {
  //modal彈出狀態 true出現／false關
  const [modalState, setModalState] = useState('none');
  //當前推文ID
  const [currentTweetId, setCurrentTweetId] = useState(0);
  //當前使用者所有資料
  const [currentUser, setCurrentUser] = useState({});
  //所有Tweet資料
  const [tweetData, setTweetData] = useState([]);
  //追蹤者資料
  const [recommendUsers, setRecommendUsers] = useState([]);
  const currentUserRef = useRef(0);
  const navigate = useNavigate();

  //登入處理
  const handleCurrentUserData = (userId) => {
    const getUserInfoAsync = async () => {
      try {
        const data = await getUserSelf(userId);
        setCurrentUser({ ...data });
      } catch (error) {
        Swal.fire({
          position: 'top',
          title: '登入失敗，請重新登入',
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        });
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        navigate('/login');
        return;
      }
    };
    getUserInfoAsync();
  };

  //更新全域推特資料
  const handleGetTweets = (tweetData) => {
    if (typeof tweetData === 'undefined') {
      return;
    }
    setTweetData(
      tweetData.map((tweet) => {
        return {
          ...tweet,
          User: {
            ...tweet.User,
          },
        };
      }),
    );
  };

  const handleModalState = (value) => {
    let currentModal = '';
    switch (value) {
      case 'tweetModal':
        currentModal = 'tweetModal';
        break;
      case 'replyModal':
        currentModal = 'replyModal';
        break;
      case 'editModal':
        currentModal = 'editModal';
        break;
      default:
        currentModal = 'none';
        break;
    }
    setModalState(currentModal);
  };

  const handleLogout = async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    navigate('/login');
  };
  //取得當前回文ID 回覆推文用
  const handleGetCurrentTweetId = (tweetId) => {
    setCurrentTweetId(tweetId);
  };
  useEffect(() => {
    if (
      currentUser.id !== currentUserRef.current.id ||
      typeof currentUser.id === 'undefined'
    ) {
      const getUserDataAsync = async () => {
        const { status } = await tokenAuthenticate();
        if (status === 'unauthorized') {
          navigate('/login');
          return;
        }
        try {
          const data = await getUserSelf();
          if (typeof currentUser.id === 'undefined') {
            setCurrentUser(data);
          }
        } catch (error) {
          console.error(error);
        }
      };
      getUserDataAsync();
    }
  }, [currentUser.id]);

  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);
  return (
    <>
      <ModalContextProvider
        handleModalState={handleModalState}
        currentTweetId={currentTweetId}
        getTweetId={handleGetCurrentTweetId}
        onLogin={handleCurrentUserData}
        currentUser={currentUser}
        updateTweetData={handleGetTweets}
        tweetData={tweetData}
        onLogout={handleLogout}
        updateCurrentUser={setCurrentUser}
        recommendUsers={recommendUsers}
        setRecommendUsers={setRecommendUsers}
      >
        {children}
        <EditModal
          isHidden={modalState === 'editModal'}
          onCloseModal={handleModalState}
        />
        <TweetModal
          isHidden={modalState === 'tweetModal'}
          onCloseModal={handleModalState}
        />
        <ReplyModal
          isHidden={modalState === 'replyModal'}
          onCloseModal={handleModalState}
        />
      </ModalContextProvider>
    </>
  );
};

export default Layout;
