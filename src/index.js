import './pages/index.css'
import './api.js'
import { createCard } from './scripts/card'

import { closePopup, openPopup } from './scripts/modal'
import { clearValidation, enableValidation } from './scripts/validation'
import {
  createNewCard,
  deleteCardItem,
  initialCards,
  likeCardDelete,
  likeCardNew,
  patchAvatarProfile,
  patchProfile
} from './api'

const popapImg = document.querySelector('.popup__image')
const caption = document.querySelector('.popup__caption')
const cardsList = document.querySelector('.places__list')
const formEditProfile = document.querySelector('.popup_type_edit')
const name = document.querySelector('.profile__title')
const job = document.querySelector('.profile__description')
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')
const formCard = document.querySelector('.popup_type_new-card')
const titleInput = document.querySelector('.popup__input_type_card-name')
const imageInput = document.querySelector('.popup__input_type_url')
const popupZoomImage = document.querySelector('.popup_type_image')
const profileEditButton = document.querySelector('.profile__edit-button')
const profileAddButton = document.querySelector('.profile__add-button')
const formNewPlace = document.forms['new-place']
const formAvatarImage = document.forms['new-avatar_image']
const profAvatar = document.querySelector('.profile__image')
const avatarProfileButton = document.querySelector('.profile__image-button')
const avatarImput = document.querySelector('.popup__input_type_src')
const avatarImage = document.querySelector('.popup_avatar_image')
const popupButtonAvatar = document.querySelector('.popup__button-avatar')
const popupButtonEditProfile = document.querySelector(
  '.popup__button-edit-profile'
)
const popupButtonNewPlace = document.querySelector('.popup__button-new-place')
const popupCardDelete = document.querySelector('.popup_card_delete')
const cardDeleteButtonPopap = document.querySelector(
  '.popup__button-card-delete'
)

const state = {
  itemToDelete: null
}

const deleteCard = item => evt => {
  evt.preventDefault()
  state.itemToDelete = item
  openPopup(popupCardDelete)
}

cardDeleteButtonPopap.addEventListener('click', function (evt) {
  if (!state.itemToDelete) {
    console.error('Не могу удалить элемент, который не сохранен в state!')
    return
  }

  deleteCardItem(state.itemToDelete._id)
  const cardElement = document.querySelector('#id' + state.itemToDelete._id)
  cardElement.remove()
  state.itemToDelete = null
  closePopup(popupCardDelete)
})

function submitAvatarEditProfile (evt) {
  evt.preventDefault()
  popupButtonAvatar.textContent = 'Сохранение...'
  patchAvatarProfile({ avatar: avatarImput.value })
    .then(data => {
      profAvatar.style.backgroundImage = `url(${data.avatar})`
      popupButtonAvatar.textContent = 'Сохранить'
      closePopup(avatarImage)
    })
    .catch(err => console.error(err))
}

avatarProfileButton.addEventListener('click', function (evt) {
  formAvatarImage.reset()
  clearValidation(avatarImage)
  openPopup(avatarImage)
})

function submitEditProfileForm (evt) {
  evt.preventDefault()
  popupButtonEditProfile.textContent = 'Сохранение...'
  const data = {
    name: nameInput.value,
    about: jobInput.value
  }
  patchProfile(data)
    .then(data => {
      name.textContent = data.name
      job.textContent = data.about
      popupButtonEditProfile.textContent = 'Сохранить'
      closePopup(formEditProfile)
    })
    .catch(err => console.error(err))
}

export function submitNewPlaceForm (evt) {
  evt.preventDefault()
  popupButtonNewPlace.textContent = 'Сохранение...'
  const item = {
    name: titleInput.value,
    link: imageInput.value
  }
  createNewCard(item)
    .then(data => {
      return data
    })
    .then(function (todo) {
      const card = createCard(todo, {
        deleteCard,
        likeCardNew,
        likeCardDelete,
        handleImageClick
      })
      cardsList.prepend(card)
      popupButtonNewPlace.textContent = 'Сохранить'
      closePopup(formCard)
    })
    .catch(err => console.error(err))
}

export function handleImageClick (evt) {
  popapImg.src = evt.target.src
  popapImg.alt = evt.target.alt
  caption.textContent = evt.target.alt
  openPopup(popupZoomImage)
}

profileEditButton.addEventListener('click', function () {
  nameInput.value = name.textContent
  jobInput.value = job.textContent
  clearValidation(formEditProfile)
  openPopup(formEditProfile)
})

profileAddButton.addEventListener('click', function () {
  formNewPlace.reset()
  clearValidation(formCard)
  openPopup(formCard)
})

initialCards()
  .then(([data, cards]) => {
    name.textContent = data.name
    job.textContent = data.about
    profAvatar.style.backgroundImage = `url(${data.avatar})`

    cards.forEach(function (initialCard) {
      const element = createCard(initialCard, {
        deleteCard,
        likeCardNew,
        likeCardDelete,
        handleImageClick
      })
      const deleteButton = element.querySelector('.card__delete-button')
      if (data._id !== initialCard.owner._id) {
        deleteButton.remove()
      }
      const likeEvenNumber = initialCard.likes.some(num => {
        return num._id === data._id
      })
      if (likeEvenNumber === true) {
        element
          .querySelector('.card__like-button')
          .classList.add('card__like-button_is-active')
      }
      element.querySelector('.card__like-button-sum').textContent =
        initialCard.likes.length
      cardsList.append(element)
    })
  })
  .catch(err => console.error(err))

enableValidation(submitEditProfileForm, formEditProfile)
enableValidation(submitNewPlaceForm, formCard)
enableValidation(submitAvatarEditProfile, avatarImage)
