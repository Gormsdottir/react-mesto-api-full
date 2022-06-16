class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => {
        return this._checkResponse(res)
      });
  }

  setUserInfoApi(userInfo) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about
      })
    })
      .then((res) => {
        return this._checkResponse(res)
      });

  }

  handleUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
      .then((res) => {
        return this._checkResponse(res)
      });
  }

  getOwnerCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => {
        return this._checkResponse(res)
      });
  }

  addUserCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => {
        return this._checkResponse(res)
      });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  delete(dataId) {
    return fetch(`${this._url}/cards/${dataId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        return this._checkResponse(res)
      });
  }

  getAllData() {
    return Promise.all([this.getOwnerCards(), this.getUserInfo()])
  }
}

export const api = new Api({
  url: 'https://api.gormsdottir.domain.nomoredomains.xyz',
  headers: {
    authorization: 'cde4f620-2d00-4326-89fd-80ea2c0d07b4',
    'Content-Type': 'application/json'
  }
});

