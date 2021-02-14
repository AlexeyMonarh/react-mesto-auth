const thenApi = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    }).then(thenApi)
  }

  getUser() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    }).then(thenApi)
  }

  setUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    }).then(thenApi)
  }

  setAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    }).then(thenApi)
  }

  createNewCard(element) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: element.name,
        link: element.link,
      })
    }).then(thenApi)
  }

  deleteCard(userId) {
    return fetch(`${this._baseUrl}/cards/${userId}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: userId,
      })
    }).then(thenApi)
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers
      }).then(thenApi)
    } else {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      }).then(thenApi)
    }
  }
}


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: '6bae60df-6d32-40ec-9280-dea8e2f20679',
    'Content-Type': 'application/json'
  }
});

export default api;