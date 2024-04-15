const cardTemplate = document.querySelector('#card-template').content;

export function createCard(item, {deleteCard, likeCard, handleImageClick}) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image')

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    cardElement.querySelector('.card__image').addEventListener('click', handleImageClick);

    return cardElement;
}

export function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}
