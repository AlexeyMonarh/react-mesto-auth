import { React } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function InfoTooltip(props) {
  const img = props.infoTool.img;
  const message = props.infoTool.message;

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      selector={'form_none'}
      infoTool={props.infoTool}
      img={img}
      message={message}
      div={
        <div className="infoTool">
          <img src={img} alt="Картинка регистрации" />
          <p className="infoTool__title infoTool__title_mobile">{message}</p>
        </div>
      }
      selectorCont={'popup__container_mobile'}
      selectorBtn={'popup__close-icon_mobile'}
    />
  )
}

export default InfoTooltip;