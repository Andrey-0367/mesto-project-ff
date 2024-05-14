import './pages/index.css'
import { createCard } from './scripts/card'
import { closePopup, openPopup } from './scripts/modal'
import {clearValidation, validationConfig} from './scripts/validation'
import {
    postNewCard,
    deleteCardItem,
    patchAvatarProfile,
    patchProfile,
    putlikeCard,
    dtletelikeCard,
    getInitialData,
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


const likeCard = (item, data, likeAmount) => evt => {
  evt.preventDefault()
  const noLikesNumber = item.likes.some(num => {
      return num._id === data._id
  })
  const likeMethod = !noLikesNumber ? putlikeCard : dtletelikeCard;
  return likeMethod(item._id)
      .then(data => {
          evt.target.classList.toggle('card__like-button_is-active')
          likeAmount.textContent = data.likes.length
          item.likes = data.likes
      })
      .catch(err => console.log(err));
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
      .then(data => {
          cardElement.remove()
      return data
      })
      .catch(err => console.error(err))
    const cardElement = document.querySelector('#id' + state.itemToDelete._id)
    state.itemToDelete = null
  closePopup(popupCardDelete)
})

function submitAvatarEditProfile (evt) {
  evt.preventDefault()
  popupButtonAvatar.textContent = 'Сохранение...'
  patchAvatarProfile({ avatar: avatarImput.value })
    .then(data => {
      profAvatar.style.backgroundImage = `url(${data.avatar})`
    })
    .catch(err => console.error(err))
    .finally(function () {
        popupButtonAvatar.textContent = 'Сохранить'
        closePopup(avatarImage)
    })
}

avatarProfileButton.addEventListener('click', function (evt) {
  formAvatarImage.reset()
  clearValidation(avatarImage, validationConfig)
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
    })
    .catch(err => console.error(err))
    .finally(function () {
        popupButtonEditProfile.textContent = 'Сохранить'
        closePopup(formEditProfile)
    })
}

function handleImageClick (evt) {
  popapImg.src = evt.target.src
  popapImg.alt = evt.target.alt
  caption.textContent = evt.target.alt
  openPopup(popupZoomImage)
}

profileEditButton.addEventListener('click', function () {
  nameInput.value = name.textContent
  jobInput.value = job.textContent
  clearValidation(formEditProfile, validationConfig)
  openPopup(formEditProfile)
})

profileAddButton.addEventListener('click', function () {
  formNewPlace.reset()
  clearValidation(formCard, validationConfig)
  openPopup(formCard)
})

getInitialData()
  .then(([data, cards]) => {
    name.textContent = data.name
    job.textContent = data.about
    profAvatar.style.backgroundImage = `url(${data.avatar})`

      function submitNewPlaceForm (evt) {
          evt.preventDefault()
          popupButtonNewPlace.textContent = 'Сохранение...'
          const item = {
              name: titleInput.value,
              link: imageInput.value
          }
          postNewCard(item)
              .then(data => {
                  return data
              })
              .then(function (todo) {
                  const card = createCard(todo, data, {
                      deleteCard,
                      likeCard,
                      handleImageClick
                  })
                  cardsList.prepend(card)
              })
              .catch(err => console.error(err))
              .finally(function () {
                  popupButtonNewPlace.textContent = 'Сохранить'
                  closePopup(formCard)
              })
      }
    enableFormSumbit(submitNewPlaceForm, formCard)

    cards.forEach(function (initialCard) {
      const element = createCard(initialCard, data, {
        deleteCard,
        likeCard,
        handleImageClick
      })
      cardsList.append(element)
    })
  })
  .catch(err => console.error(err))

const enableFormSumbit = (submitEvent, formElement) => {
    formElement.addEventListener('submit', submitEvent)
}

enableFormSumbit(submitEditProfileForm, formEditProfile)
enableFormSumbit(submitAvatarEditProfile, avatarImage)
