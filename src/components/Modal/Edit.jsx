import style from './edit.module.scss'
import { avatar, userBanner, uploadIcon, closeWhite } from '../../assets/images/index';
import close from '../../assets/images/close.svg'
//Hook
import { useState, useEffect, useRef } from 'react';
//Context
import { useModal } from 'contexts/userContext';
//API

const EditModal = ({ isHidden, onCloseModal, onUpload }) => {
  const { userData } = useModal()
  const [ editName, setEditName ] = useState('')
  const [ editInfo, setEditInfo ] = useState('')
  const [ editAvatar, setEditAvatar ] = useState()
  const [ editBanner, setEditBanner ] = useState()
  const inputRef = useRef(null)
  const bannerRef = useRef(null)
  const  handleEdit = () => {
    inputRef.current.click()
  } 
  const handleEditBanner = () => {
    bannerRef.current.click()
  }

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.addEventListener("load", function () {
      setEditAvatar(reader.result)
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  }

    const handleChangeBanner = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.addEventListener("load", function () {
      setEditBanner(reader.result)
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = () => {
    onUpload(editName, editInfo, editAvatar, editBanner)
  }

  return (
      <>
        <section className={`${!isHidden && style.hidden} ${style.modal}`}>
        <div className={style.modalHeader}>
            <button 
            className={style.close} style={{ backgroundImage: `url(${close})` }}
            onClick={() => {onCloseModal?.('none')}}
            >
            </button>
            <button 
            className={style.submitBtn}
            onClick={handleSubmit}
            >儲存</button>
        </div>
        <div className={style.banner}>
          <img src={!editBanner ? userData.background : editBanner} alt="banner" />
          <input className={style.bannerUpload}
            ref={bannerRef}
            type="file" accept='image/jpg,jpeg,png'
            onChange={(e)=>{ handleChangeBanner(e)}}
          />
          <div className={style.bannerControl}>
            <button className={style.uploadBanner} 
            style={{ backgroundImage: `url(${uploadIcon})`}}
            onClick={handleEditBanner}
          ></button>
            <button className={style.deleteBanner} 
            style={{ backgroundImage: `url(${closeWhite})`}}
          ></button>
          </div>
        </div>
        <form className={style.form}>
          <div className={style.formControl}>
            <div className={style.text_container}>
              <div className={style.label}>姓名</div>
                <input
                  className={style.input}
                  type='text'
                  placeholder={userData.name}
                  value={editName}
                  onChange={(e)=>setEditName(e.target.value)}
                />
              </div>
            </div>
            <div className={style.calculateWord}>
              <span>{editName.length}/50</span>
            </div>
            <div className={style.textarea_container}>
              <div className={style.label}>自我介紹</div>
              <textarea className={style.textarea}
                placeholder={userData.introduction}
                value={editInfo}
                onChange={(e)=>setEditInfo(e.target.value)}
              >
              </textarea>
            </div>
            <div className={style.calculateWord}>
                <span>{editInfo.length}/160</span>
            </div>
        </form>
        <div className={style.avatar}>
          <div ><button className={style.uploadBtn} 
            style={{ backgroundImage: `url(${uploadIcon})`}}
            onClick={handleEdit}
            ></button></div>
          <img src={!editAvatar ? userData.avatar : editAvatar} alt="avatar" />
          <input className={style.avatarUpload}
            ref={inputRef}
            type="file" accept='image/jpg,jpeg,png'
            onChange={(e)=>{ handleChangeAvatar(e)}}
            />
        </div>
      </section>
      <div className={`${!isHidden && style.hidden} ${style.overlay}`}></div>
      </>
  )
}

export default EditModal 