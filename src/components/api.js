import {checkResponse} from '../utils/utils.js';
//КОНФИГ ЗАПРОСА
const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-38",
    headers: {
      authorization: "ab8205ad-fc58-4233-b269-d7db741696e0",
    },
};

export const fetchRemoveCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
          authorization: config.headers.authorization,
          'Content-Type': 'application/json'
      }
  })
  .then(checkResponse)
} 

export const fetchDeleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    }
  })
  .then(checkResponse)
  .catch((err) => {
    console.log(err);
  });
}

export const fetchAddLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
        authorization: config.headers.authorization,
        'Content-Type': 'application/json'
      }
  })
  .then(checkResponse)
}

export const fetchSaveProfileImage = (newAvatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
          authorization: config.headers.authorization,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          avatar: newAvatarUrl
      })
  })
  .then(checkResponse)
}

export const fetchSaveProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
          authorization: config.headers.authorization,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
  })
  .then(checkResponse)
}

export const fetchSaveCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: {
          authorization: config.headers.authorization,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
  })
  .then(checkResponse)
}

export const fetchGetProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(checkResponse)
}

export const fetchGetCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(checkResponse)
}