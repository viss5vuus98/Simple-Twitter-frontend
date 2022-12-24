import style from './settingPage.module.scss'
import { useModal } from 'contexts/userContext'
import { useState } from 'react'
import { EditUserAccount } from '../../api/usersApi'


const SettingPage = () => {
  const { userData } = useModal()
  const [ editAccount, setEditAccount ] = useState('')
  const [ editName, setEditName] = useState('')
  const [ editEmail, setEditEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ checkPassword, setCheckPassword ] = useState('')

  const handleSubmit = () => {
    const upLoadUserSet = async () => {
      await EditUserAccount(userData.id);     
    }
    upLoadUserSet()
  }
  return (
    <>
      <div className={style.header}>
        <h4 className={style.title}>帳戶設定</h4>
      </div>
      <form className={style.form} action="">
        <div className={style.formControl}>
            <div className={style.text_container}>
              <div className={style.label}>帳號</div>
                <input
                  className={style.input}
                  type='text'
                  defaultValue={editAccount || userData.account}
                  onChange={(e)=>setEditAccount(e.target.value)}
                />
            </div>
            <div className={style.text_container}>
              <div className={style.label}>名稱</div>
                <input
                  className={style.input}
                  type='text'
                  defaultValue={editName || userData.name}
                  onChange={(e)=>setEditName(e.target.value)}
                />
            </div>
            <div className={style.text_container}>
              <div className={style.label}>Email</div>
                <input
                  className={style.input}
                  type='text'
                  defaultValue={editEmail || userData.email}
                  onChange={(e)=>setEditEmail(e.target.value)}
                />
            </div>
            <div className={style.text_container}>
              <div className={style.label}>密碼</div>
                <input
                  className={style.input}
                  type='text'
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div className={style.text_container}>
              <div className={style.label}>確認密碼</div>
                <input
                  className={style.input}
                  type='text'
                  value={checkPassword}
                  onChange={(e)=>setCheckPassword(e.target.value)}
                />
            </div>
            <div className={style.formControl}>
              <button 
              className={style.submitBtn}
              onClick={(e) => {e.preventDefault(); handleSubmit()}}
              >儲存</button>
            </div>
        </div>
      </form>
    </>
  )
}

export default SettingPage