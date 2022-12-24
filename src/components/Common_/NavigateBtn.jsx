import { useNavigate } from "react-router-dom";
import style from './navigateBtn.module.scss'
import { arrow } from '../../assets/images/index';

const NavigateBtn = ({title}) => {
  let navigate = useNavigate();
  return (
    <>
      <div className={style.header} onClick={()=> {navigate(-1)}}>
        <img className={style.arrow} src={arrow} alt="" />
        <h4 className={style.title}>{title}</h4>
      </div>
    </>
  )
}

export default NavigateBtn