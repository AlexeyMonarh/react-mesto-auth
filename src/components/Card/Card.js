import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.data.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `elements__element-delete-button ${isOwn ? 'elements__element-delete-button_visible' : 'elements__element-delete-button_hidden'}`
  );
  const isLiked = props.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__element-like ${isLiked ? 'elements__element-like_visible' : 'elements__element-like_hidden'}`;

  function setCardId() {
    // props.setId(props._id);
    // props.onPopupDelete();
    props.handleCardDelete(props._id)
  }

  function handleLikeClick() {
    props.onCardLike(props);
  }

  function handleClick() {
    props.onCardClick(props);
  }

  return (
    <li className="elements__element">
      <button type="submit" className={cardDeleteButtonClassName} onClick={setCardId}></button>
      <img src={props.link} id="" alt="Места-России" className="elements__element-img" onClick={handleClick} />
      <div className="elements__element-description">
        <h2 className="elements__element-title">{props.name}</h2>
        <div className="elements__element-like-box">
          <button type="submit" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <div className="elements__element-likes">{props.likes.length}</div>
        </div>
      </div>
    </li>
  )
}

export default Card;