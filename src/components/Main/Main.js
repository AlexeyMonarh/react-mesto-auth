import React from 'react';
import Card from '../Card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <Header headerMob={'header_mobile'} email={props.email} title="Выход" onClick={props.signOut} to=""/>
      <section className="profile">
        <div className="profile__avatar-hover" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }}>
        </div>
        <div className="profile__info">
          <div className="profile__info-content">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <p className="profile__info-status">{currentUser.about}</p>
          </div>
          <button className="profile__info-edit-button" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      <section>
        <ul className="elements">
          {props.cards.map((data, _id) => {
            return (
              <Card
                key={data._id}
                data={data}
                link={data.link}
                name={data.name}
                _id={data._id}
                likes={data.likes}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                // setId={props.setId}
                onPopupDelete={props.onPopupDelete}
                handleCardDelete={props.handleCardDelete}
              />
            )
          })}
        </ul>
      </section>
      <Footer />
    </main>
  );
}

export default Main;