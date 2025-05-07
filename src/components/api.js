//КОНФИГ ЗАПРОСА
export const config = {
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
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
} 

export const fetchDeleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
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
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
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
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

export const fetchSaveProfile = (popupEditProfileFormInputName, popupEditProfileFormInputDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
          authorization: config.headers.authorization,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: popupEditProfileFormInputName.value,
        about: popupEditProfileFormInputDescription.value
      })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

export const fetchSaveCard = (popupNewCardFormInputName, popupNewCardFormInputLink) => {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: {
          authorization: config.headers.authorization,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: popupNewCardFormInputName.value,
        link: popupNewCardFormInputLink.value
      })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

export const fetchGetProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

export const fetchGetCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}