import style from './AuthInput.module.scss';
 
const AuthInput = ({ type, label, value, placeholder, onChange }) => {
  return (
    
    <div className={style.text_container}>
      <div className={style.label}>{label}</div>

      <input
        className={style.input}
        type={type || 'text'}
        value={value || ''}
        placeholder={placeholder || ''}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </div>
  );
};


export default AuthInput;