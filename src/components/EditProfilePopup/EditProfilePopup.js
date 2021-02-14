import React from 'react';
import PopupWithForm from '../../components/PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser])

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function inputName(e) {
    setName(e.target.value);
  }

  function inputDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name='edit-profile'
      title='Редактировать профиль'
      button='Сохранить'
      inputs={
        <>
          <input type="text" className="popup__input popup__input-name" value={name || ''} onChange={inputName} placeholder="Имя" name="name" required />
          <span className="popup__error" id="name-error"></span>
          <input type="text" className="popup__input popup__input-job" value={description || ''} onChange={inputDescription} placeholder="О себе" name="link" required />
          <span className="popup__error" id="link-error"></span>
        </>
      }
    />
  )
}