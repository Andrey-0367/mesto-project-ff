import { user } from '../api'

const cardTemplate = document.querySelector('#card-template').content

export function createCard (item, { deleteCard, likeCardNew, likeCardDelete, handleImageClick }) {

  const cardElement = cardTemplate.cloneNode(true)
  const cardImage = cardElement.querySelector('.card__image')
  const cardLikeSum = cardElement.querySelector('.card__like-button-sum')
  const cardDeleteButton = cardElement.querySelector('.card__delete-button')
  const cardLikeButton = cardElement.querySelector('.card__like-button')

  cardImage.src = item.link
  cardImage.alt = item.name
  cardElement.querySelector('li').id = 'id' + item._id
  cardElement.querySelector('.card__title').textContent = item.name
  cardDeleteButton.addEventListener('click', deleteCard(item))
  cardLikeButton.addEventListener('click', function (evt) {
    evt.preventDefault()
    evt.target.classList.toggle('card__like-button_is-active')
    user
      .then(list => {
        const noLikesNumber = item.likes.some(num => {
          return num._id === list._id
        })
        if (noLikesNumber === false) {
          likeCardNew(item._id).then(data => {
            cardLikeSum.textContent = data.likes.length
            item.likes = data.likes
          })
        } else {
          likeCardDelete(item._id).then(data => {
            cardLikeSum.textContent = data.likes.length
            item.likes = data.likes
          })
        }
      })
      .catch(err => console.error(err))
  })

  cardElement
    .querySelector('.card__image')
    .addEventListener('click', handleImageClick)

  return cardElement
}
