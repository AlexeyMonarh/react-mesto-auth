import React from 'react';
import PopupWithForm from '../../components/PopupWithForm/PopupWithForm';

export default function AddPlacePopup(props) {
  const [place, setPlace] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onCreateCard({
      name: place,
      link: link,
    });
    setPlace('');
    setLink('');
  }

  function inputPlace(e) {
    setPlace(e.target.value);
  }

  function inputLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name='add-element'
      title='Новое место'
      button={props.createPreload}
      inputs={
        <>
          <input type="text" className="popup__input popup__input-place" value={place || ''} onChange={inputPlace} placeholder="Название" name="name" required />
          <span className="popup__error" id="name-error"></span>
          <input type="url" className="popup__input popup__input-link" value={link || ''} onChange={inputLink} placeholder="Ссылка на картинку" name="link" />
          <span className="popup__error" id="link-error"></span>
        </>
      }
    />
  )
}
