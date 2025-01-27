import { React, useEffect, useState } from "react";
import { Route, Switch, Redirect, withRouter, useHistory } from "react-router-dom";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import succed from '../images/vector/succed.svg';
import fail from '../images/vector/fail.svg';
import Main from '../components/Main/Main';
import ImagePopup from '../components/ImagePopup/ImagePopup';
import EditProfilePopup from '../components/EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup/AddPlacePopup';
import RemoveCardPopup from '../components/RemoveCardPopup/RemoveCardPopup';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../components/InfoTooltip/InfoTooltip';
import api from '../utils/api';
import * as projectAuth from '../utils/projectAuth';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [currentUser, setСurrentUser] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [infoTool, setInfoTool] = useState({
    message: '',
    img: ''
  });
  const [registerPopup, setRegisterPopup] = useState();
  const [savePreload, setSavePreload] = useState('Сохранить')
  const [createPreload, setCreatePreload] = useState('Создать')

  const err = (res) => {
    console.log(`Ошибка: ${res}`);
  };

  const history = useHistory();

  const escFunction = (event) => {
    if (event.keyCode === 27) {
      closeAllPopups();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      projectAuth.getContent(token).then((res) => {
        if (res) {
          setUserData({ email: res.data.email });
        }
      })
        .then(() => {
          setLoggedIn(true);
          history.push("/");
        })
        .catch((res) => {
          console.log(`Ошибка: ${res}`);
        })
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  });

  useEffect(() => {
    api.getInitialCards().then((res) => {
      setCards(res);
    }).catch(err)
  }, []);

  useEffect(() => {
    api.getUser().then((res) => {
      setСurrentUser(res);
    }).catch(err)
  }, []);

  function handleRegister(data) {
    const { email, password } = data;
    projectAuth.register(email, password).then((res) => {
      if (res) {
        history.push('/sign-in');
        setRegisterPopup(true);
        setInfoTool({
          message: 'Вы успешно зарегистрировались!',
          img: succed
        })
      }
    })
      .catch((err) => {
        setRegisterPopup(true);
        setInfoTool({
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
          img: fail
        })
        console.log(`Такой email существует ${err}`)
      })
  }

  function handleLogin(data) {
    const { email, password } = data;
    setUserData({ email: email });
    projectAuth.authorize(email, password).then((res) => {
      if (res.token) {
        history.push('/')
        setLoggedIn(true);
        localStorage.setItem('jwt', res.token)
      }
    })
      .catch(err)
  }

  function signOut() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    history.push('/sign-in')
  }

  function handleAddPlaceSubmit(data) {
    setCreatePreload('Создание...')
    api.createNewCard(data).then((res) => {
      setCards([res, ...cards]);
      closeAllPopups();
    })
      .catch(err)
      .finally(() => {
        setCreatePreload('Создать');
        closeAllPopups();
      }
      )
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    }).catch(err)
  }

  function handleCardDelete(cardId) {
    return api.deleteCard(cardId).then(() => {
      const newList = cards.filter((c) => c._id !== cardId);
      return setCards(newList);
    })
      .then(closeAllPopups())
      .catch(err)
  }

  function handleUpdateAvatar(data) {
    setSavePreload('Сохранение...')
    api.setAvatar(data)
      .then((res) => {
        setСurrentUser(res);
      })
      .catch(err)
      .finally(() => {
        setSavePreload('Сохранить');
        closeAllPopups();
      }
      )
  }

  function handleUpdateUser(data) {
    setSavePreload('Сохранение...')
    api.setUserInfo(data.name, data.about)
      .then((res) => {
        setСurrentUser(res);
        closeAllPopups();
      })
      .catch(err)
      .finally(() => {
        setSavePreload('Сохранить');
        closeAllPopups();
      }
      )
  }

  function handleDeleteCardClick() {
    setIsDeletePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(props) {
    setSelectedCard({ link: props.link, name: props.name });
  }

  function closeAllPopups() {
    setIsDeletePopupOpen(false)
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setRegisterPopup(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            email={userData.email}
            signOut={signOut}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onPopupDelete={handleDeleteCardClick}
            setId={setCurrentId}
            handleCardDelete={handleCardDelete}
          />
          <Route path="/sign-in">
            <Login
              handleLogin={handleLogin}
            />
          </Route>
          <Route path="/sign-up">
            <Register
              onRegister={handleRegister}
            />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
          <Route path="/my-profile">
          </Route>
        </Switch>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          savePreload={savePreload}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          savePreload={savePreload}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCreateCard={handleAddPlaceSubmit}
          createPreload={createPreload}
        />

        <RemoveCardPopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          currentId={currentId}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={registerPopup}
          onClose={closeAllPopups}
          infoTool={infoTool}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);