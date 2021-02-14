import React from 'react'

function ImagePopup(props) {
    return (
      <div className={props.card ? `popup popup_${props.card} popup_image-background popup_open` : `popup popup_${props.card} popup_image-background`}>
        <div className="popup__overlay" onClick={props.onClose}></div>
        <div className="popup__container popup__container_image">
          <button className="popup__close-icon" onClick={props.onClose}></button>
          <img src={props.card.link} alt="Места-России" className="popup__image" />
          <h5 className="popup__title">{props.card.name}</h5>
        </div>
      </div>
    )
}

export default ImagePopup;