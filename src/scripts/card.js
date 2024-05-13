const cardTemplate = document.querySelector('#card-template').content

export function createCard (item, data, { deleteCard, likeCard, handleImageClick }) {

  const cardElement = cardTemplate.cloneNode(true)
  const cardImage = cardElement.querySelector('.card__image')
  const cardDeleteButton = cardElement.querySelector('.card__delete-button')
  const cardLikeButton = cardElement.querySelector('.card__like-button')
  const likeAmount = cardElement.querySelector('.card__like-button-amount')

  if (data._id !== item.owner._id) {
    cardDeleteButton.remove()
  }
  const likeEvenNumber = item.likes.some(num => {
    return num._id === data._id
  })
  if (likeEvenNumber) {
    cardLikeButton.classList.add('card__like-button_is-active')
  }
  likeAmount.textContent = item.likes.length
  cardImage.src = item.link
  cardImage.alt = item.name
  cardElement.querySelector('li').id = 'id' + item._id
  cardElement.querySelector('.card__title').textContent = item.name
  cardDeleteButton.addEventListener('click', deleteCard(item))
  cardLikeButton.addEventListener('click', likeCard(item, data, likeAmount))
  cardElement.querySelector('.card__image').addEventListener('click', handleImageClick)

  return cardElement
}
