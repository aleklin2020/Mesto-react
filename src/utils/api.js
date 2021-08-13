class Api {
  constructor({ link, token }) {
    this._baseUrl = link;
    this._headers = token;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error("Произошла ошибка ${res.status}"));
    }
  }
  // Получение информаций профиля с сервера
  getUserInform() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  // обновление информаций на сервере
  setUserInform(name, profession) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: profession,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  // Обновление аватара на сервере
  getAvatarProfile(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  // Получение обекта карточек с сервера
  getIntialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  // Добавление карточек на сервер
  photoAddServer(newCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  // Добавление/удаление лайков
 LikeCard(id, like) {
        if (like) {
            return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'PUT',
                headers: this._headers,
            })
            .then(res => {return this._checkResponse(res)})
         } else {
            return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(res => {return this._checkResponse(res)})
         }
    }
  // удаление карточек
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}
const api = new Api({
  link: "https://mesto.nomoreparties.co/v1/cohort-25",
  token: {
    authorization: "e46362ce-1599-486f-9051-b9d59ed9a09d",
    "Content-Type": "application/json",
  },
});
export default api;
