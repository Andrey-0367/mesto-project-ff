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

export const user = fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers
}).then(handleRequest)

export const cards = fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
}).then(handleRequest)

export function createNewCard (NewCard) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: NewCard.name,
      link: NewCard.link,
      _id: NewCard._id
    })
  }).then(handleRequest)
}

export function initialCards () {
  return Promise.all([user, cards])
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
  fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(handleRequest)
    .catch(err => console.error(err))
}

export function likeCardNew (id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers
  }).then(handleRequest)
}

export function likeCardDelete (id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(handleRequest)
}
