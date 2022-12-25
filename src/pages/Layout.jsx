import { TweetModal, ReplyModal, EditModal } from "components";
//hook
import { useState } from "react";
import { ModalContextProvider } from '../contexts/userContext'
//asset
import { home, user, set} from '../assets/images/index'
//API
import { tokenAuthenticate } from '../api/auth'
import { getUserInfo, EditUserInfo } from '../api/usersApi'
//Route
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const userFunction = [
    {
    name: '首頁',
    link: '/main',
    id: 1,
    icon: home
  },
    {
    name: '個人資料',
    link: '/user',
    id: 2,
    icon: user
  },
    {
    name: '設定',
    link: '/setting',
    id: 3,
    icon: set
  }
]

const adminFunction = [
  {
    name: '推文清單',
    link: 'admin/main',
    id: 1,
    icon: home,
  },
  {
    name: '使用者列表',
    link: 'admin/user',
    id: 2,
    icon: user,
  },
];


const Layout = ({children}) => {
  //modal彈出狀態 true出現／false關
  const [ modalState, setModalState ] = useState('none')
  //當前推文ID
  const [ currentTweetId, setCurrentTweetId ] = useState(0)
  //當前UserId
  const [ currentUserId, setCurrentUserId ] = useState(0)
  //當前使用者所有資料
  const [ currentUser, setCurrentUser] = useState({})
  //所有Tweet資料
  const [ tweetData, setTweetData ] = useState()
  const navigate = useNavigate();

  //登入處理
  const handleCurrentUserData = (userId) => {
    const getUserInfoAsync = async () => {
      try{
        const data = await getUserInfo(userId);
        setCurrentUser({...data})
      }catch(error){
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
        return
      }
    }
    getUserInfoAsync()
  }

  

  //更新全域推特資料
  const handleGetTweets = (tweetData) => {
    setTweetData(tweetData.map(tweet => {
      return {
        ...tweet,
        User: {
          ...tweet.User
        }
      };
    }));
  }

  const handleModalState = (value) => {
    let currentModal = ''
    switch (value) {
      case 'tweetModal':
        currentModal = 'tweetModal'
        break;
      case 'replyModal':
        currentModal = 'replyModal'
        break;
      case 'editModal':
        currentModal = 'editModal'
        break;
      default:
        currentModal = 'none'
        break;
    }
    setModalState(currentModal)
  }

  const handleLogout = async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId')

    navigate('/login');
  };
  //取得當前回文ID 回覆推文用
  const handleGetCurrentTweetId = (tweetId) => {
    setCurrentTweetId(tweetId)
  }
  //修改個人資料
  const handleSubmitEditUser = (editName, avatar, banner, editInfo) => {
    const editInfoAsync = async () => {
      try{
        const data = await EditUserInfo(currentUserId, editName, avatar, banner, editInfo)
        console.log(data)
        debugger
        setCurrentUser({ ...data });
        handleModalState('none')
          Swal.fire({
          toast: true,
          position: 'top-end',
          title: '修改成功！',
          timer: 1000,
          icon: 'success',
          showConfirmButton: false,
        });
      }catch(error){
        console.error(error)
      }
    }
    editInfoAsync()
  }
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
      >
        {children}
        <EditModal
          isHidden={modalState === 'editModal'}
          onCloseModal={handleModalState}
          onUpload={handleSubmitEditUser}
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
