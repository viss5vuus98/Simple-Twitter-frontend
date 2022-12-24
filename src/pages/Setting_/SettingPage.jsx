import style from './settingPage.module.scss'
import { useModal } from 'contexts/userContext'
import { useState } from 'react'
import { EditUserAccount } from '../../api/usersApi'
import Swal from 'sweetalert2';

const SettingPage = () => {
  const { userData } = useModal()
  const [ editAccount, setEditAccount ] = useState('')
  const [ editName, setEditName] = useState('')
  const [ editEmail, setEditEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ checkPassword, setCheckPassword ] = useState('')

  const handleSubmit = () => {
    const upLoadUserSet = async () => {
      const account = editAccount || userData.account
      const name = editName || userData.name
      const email = editEmail || userData.email
      if(password !== checkPassword){
        Swal.fire({
          toast: true,
          position: 'top-end',
          title: '密碼與確認密碼不相同',
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        });
        return 
      }
      if(password.trim().length < 8){
        Swal.fire({
          toast: true,
          position: 'top-end',
          title: '密碼與確認密碼不相同',
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        });
        return
      }
      try{
        await EditUserAccount(userData.id, account, name, email, password, checkPassword);
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
          Swal.fire({
          toast: true,
          position: 'top-end',
          title: `修改失敗 原因:${error}`,
          timer: 1000,
          icon: 'error',
          showConfirmButton: false,
        });
      }
    }
    upLoadUserSet()
  }
  return (
    <section>
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
                  type='password'
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div className={style.text_container}>
              <div className={style.label}>確認密碼</div>
                <input
                  className={style.input}
                  type='password'
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
    </section>
  )
}

export default SettingPage