class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  }

  getOwnerCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  }

  setUserInfoApi(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  handleUserAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }

  addUserCard(name, link, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, token, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  }

  delete(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getAllData() {
    return Promise.all([this.getOwnerCards(), this.getUserInfo()])
  }
}

const api = new Api({
  baseUrl: 'http://api.gormsdottir.domain.nomoredomains.xyz/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;