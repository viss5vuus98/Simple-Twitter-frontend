import style from './edit.module.scss';
import { uploadIcon, closeWhite } from '../../assets/images/index';
import close from '../../assets/images/close.svg';
//Hook
import { useState, useRef } from 'react';
//Context
import { useModal } from 'contexts/userContext';
//API
import { EditUserInfo } from '../../api/usersApi';
import Swal from 'sweetalert2';

const EditModal = ({ isHidden, onCloseModal }) => {
  const { currentUser, updateCurrentUser } = useModal();
  const [editName, setEditName] = useState('');
  const [editInfo, setEditInfo] = useState('');
  const [editAvatar, setEditAvatar] = useState();
  const [editBanner, setEditBanner] = useState();
  const inputRef = useRef(null);
  const bannerRef = useRef(null);
  const handleEdit = () => {
    inputRef.current.click();
  };
  const handleEditBanner = () => {
    bannerRef.current.click();
  };

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      function () {
        setEditAvatar(reader.result);
      },
      false,
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChangeBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      function () {
        setEditBanner(reader.result);
      },
      false,
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (editName.length > 50) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        title: '超過姓名字數上限',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
      return;
    }
    if (editInfo.length > 160) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        title: '超過自我介紹字數上限',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
      return;
    }
    const sendName = editName.length > 0 ? editName : currentUser.name;
    const uploadAvatar = inputRef.current.files[0];
    const uploadBanner = bannerRef.current.files[0];
    const editUserAsync = async () => {
      const { name, introduction, avatar, background } = await EditUserInfo(
        currentUser.id,
        sendName,
        uploadAvatar,
        uploadBanner,
        editInfo,
      );
      const update = {
        ...currentUser,
        name,
        introduction,
        avatar,
        background,
      };
      updateCurrentUser(update);
    };
    editUserAsync();
    onCloseModal?.('none');
    Swal.fire({
      toast: true,
      position: 'top-end',
      title: '修改成功！',
      timer: 1000,
      icon: 'success',
      showConfirmButton: false,
    });
  };

  return (
    <>
      <section className={`${!isHidden && style.hidden} ${style.modal}`}>
        <div className={style.modalHeader}>
          <button
            className={style.close}
            style={{ backgroundImage: `url(${close})` }}
            onClick={() => {
              onCloseModal?.('none');
            }}
          ></button>
          <button className={style.submitBtn} onClick={handleSubmit}>
            儲存
          </button>
        </div>
        <div className={style.banner}>
          <img
            src={!editBanner ? currentUser.background : editBanner}
            alt="banner"
          />
          <input
            className={style.bannerUpload}
            ref={bannerRef}
            type="file"
            accept="image/jpg,jpeg,png"
            onChange={(e) => {
              handleChangeBanner(e);
            }}
          />
          <div className={style.bannerControl}>
            <button
              className={style.uploadBanner}
              style={{ backgroundImage: `url(${uploadIcon})` }}
              onClick={handleEditBanner}
            ></button>
            <button
              className={style.deleteBanner}
              style={{ backgroundImage: `url(${closeWhite})` }}
            ></button>
          </div>
        </div>
        <form className={style.form}>
          <div className={style.formControl}>
            <div className={style.text_container}>
              <div className={style.label}>姓名</div>
              <input
                className={style.input}
                type="text"
                defaultValue={editName || currentUser.name}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
          </div>
          <div className={style.calculateWord}>
            <span>{editName.length}/50</span>
          </div>
          <div className={style.textarea_container}>
            <div className={style.label}>自我介紹</div>
            <textarea
              className={style.textarea}
              defaultValue={editInfo || currentUser.introduction}
              onChange={(e) => setEditInfo(e.target.value)}
            ></textarea>
          </div>
          <div className={style.calculateWord}>
            <span>{editInfo.length}/160</span>
          </div>
        </form>
        <div className={style.avatar}>
          <div>
            <button
              className={style.uploadBtn}
              style={{ backgroundImage: `url(${uploadIcon})` }}
              onClick={handleEdit}
            ></button>
          </div>
          <img
            src={!editAvatar ? currentUser.avatar : editAvatar}
            alt="avatar"
          />
          <input
            className={style.avatarUpload}
            ref={inputRef}
            type="file"
            accept="image/jpg,jpeg,png"
            onChange={(e) => {
              handleChangeAvatar(e);
            }}
          />
        </div>
      </section>
      <div className={`${!isHidden && style.hidden} ${style.overlay}`}></div>
    </>
  );
};

export default EditModal;
