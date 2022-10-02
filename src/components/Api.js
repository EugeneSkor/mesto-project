export default class Api {
  constructor(token) {
    this.baseUrl = token.baseUrl;
    this.headers = token.headers;
  }

  // Получаем данные о пользователе
  getUserInfo() {
    return fetch(`${this.baseUrl}users/me`, {
      method: "GET",
      headers: this.headers
      // Проверяем ответ на ошибки
    }).then(this._eliminateErrors);
  }

  // Получаем все карточки
  getCards() {
    return fetch(`${this.baseUrl}cards`, {
      method: "GET",
      headers: this.headers
    }).then(this._eliminateErrors);
  }

  // Проверка ответа на ошибки
  _eliminateErrors(res) {
    // если пришел статус успешно
    if (res.ok) {
      // возвращаем результат в формате json
      return res.json()
    }
    // Если нет - ловим catch для вывода в консоль ошибки
    return Promise.reject(`Что-то пошло не так: Ошибка ${res.status}`)
  }

  // Загрузка данных для отображения на странице
  getAllNeededData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }

  // Заменяем информацию о пользователе
  patchUserInfo(userData) {
    return fetch(`${this.baseUrl}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    }).then(this._eliminateErrors);
  }

  // Добавляем карточку
  postCard(cardData) {
    return fetch(`${this.baseUrl}cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    }).then(this._eliminateErrors);
  }

  // Удаляем карточку
  delCard(id) {
    return fetch(`${this.baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    }).then(this._eliminateErrors);
  }

  // Добавляем лайк
  addLike(id) {
    return fetch(`${this.baseUrl}cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers
    }).then(this._eliminateErrors);
  }

  // Удаляем лайк
  delLike(id) {
    return fetch(`${this.baseUrl}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers
    }).then(this._eliminateErrors);
  }

  // Заменяем аватар
    patchAvatar(link) {
    return fetch(`${this.baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link.link
      })
    }).then(this._eliminateErrors);
  }

};
