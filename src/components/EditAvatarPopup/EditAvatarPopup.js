import React from 'react';
import PopupWithForm from '../../components/PopupWithForm/PopupWithForm';

export default function EditAvatarPopup(props) {
  const avaRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avaRef.current.value,
    });
    avaRef.current.value = '';
  } 

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name='edit-avatar'
      title='Обновить аватар'
      button='Сохранить'
      inputs={(
        <>
          <input type="url" ref={avaRef} className="popup__input popup__input-link" placeholder="Ссылка на новый аватар"
            name="link" />
          <span className="popup__error" id="link-error"></span>
        </>
      )}
    />
  )
}
