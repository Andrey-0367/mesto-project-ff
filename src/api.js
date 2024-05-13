const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
  headers: {
    authorization: '52146976-fe6f-4cd8-b4d3-b5f95bdd9966',
    'Content-Type': 'application/json'
  }
}

const handleRequest = res => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUser = fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers
}).then(handleRequest)

export const getCards = fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
}).then(handleRequest)

export function postNewCard (newCard) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link
    })
  }).then(handleRequest)
}

export function getInitialData () {
  return Promise.all([getUser, getCards])
}

export function patchProfile (newProfile) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newProfile.name,
      about: newProfile.about
    })
  }).then(handleRequest)
}

export function patchAvatarProfile (newProfile) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newProfile.avatar
    })
  }).then(handleRequest)
}

export function deleteCardItem (id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(handleRequest)
}

export function putlikeCard (id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers
  }).then(handleRequest)
}

export function dtletelikeCard (id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(handleRequest)
}
