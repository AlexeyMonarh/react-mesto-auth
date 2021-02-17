import React from 'react';
import PopupWithForm from '../../components/PopupWithForm/PopupWithForm';

export default function RemoveCardPopup(props) {

  function handleDeleteClick(e) {
    e.preventDefault();
    props.onCardDelete(props.currentId);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCardDelete={handleDeleteClick}
      name='remove-card'
      title='Вы уверены?'
      button='Да'
    />
  )
}