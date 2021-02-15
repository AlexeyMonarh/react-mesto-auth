import { React, useState } from 'react';
import Header from '../../components/Header/Header';

function Login({ handleLogin }) {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  })

  function handleChange(e) {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  }

  function habdleSubmite(e) {
    e.preventDefault();
    handleLogin(inputValue)
  }

  return (
    <div className="loginContainer ">
      <div className="header_width">
        <Header title="Регистрация" to="/sign-up" />
      </div>
      <div className="register">
        <form action="#" onSubmit={habdleSubmite} className="popup__inputs register__form register__form_mobile">
          <h2 className="popup__heading">Вход</h2>
          <input type="email" name="email" className="popup__input register__input" onChange={handleChange} value={inputValue.email} placeholder="Email" required autoComplete="off" />
          {/* <span className="popup__error" id="name-error"></span> */}
          <input type="password" name="password" className="popup__input register__input" onChange={handleChange} value={inputValue.password} placeholder="Пароль" required />
          {/* <span className="popup__error" id="link-error"></span> */}
          <button type="submit" className="popup__submit-button register__button register__button_mobile">Войти</button>
        </form>
      </div>
    </div>
  )
}

export default Login;