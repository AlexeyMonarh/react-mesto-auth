import { React, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';

function Register({ onRegister }) {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const [massage, setMassage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  }

  const history = useHistory();

  function habdleSubmite(e) {
    e.preventDefault();
    onRegister(inputValue)
      .then(() => {
        history.push('/sign-in')
      }).catch((err) => {
        setMassage(err.massage || 'Ошибка при регистрации')
      });
  }

  return (
    <div className="loginContainer">
      <Header title="Вход" to="/sing-in" />
      <div className="register">
        <form action="#" className="popup__inputs register__form register__form_mobile" onSubmit={habdleSubmite}>
          <h2 className="popup__heading">Регистрация</h2>
          <input type="email" name="email" className="popup__input register__input" onChange={handleChange} value={inputValue.email} placeholder="Email" required autoComplete="off" />
          {/* <span className="popup__error" id="name-error"></span> */}
          <input type="password" name="password" className="popup__input register__input" onChange={handleChange} value={inputValue.password} placeholder="Пароль" required />
          {/* <span className="popup__error" id="link-error"></span> */}
          <button type="submit" className="popup__submit-button register__button register__button_mobile">Зарегистрироваться</button>
          <span className="register__span register__span_mobile">Уже зарегистрированы?<Link className="header__auth" to="/sign-in"> Войти</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Register;