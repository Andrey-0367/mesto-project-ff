// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const cardsList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


function createCard(item, { deleteCard }) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image')

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard)

    return cardElement;
}

function removeCard(evt) {
    const item = evt.target.closest('.places__item');
        item.remove()
}

initialCards.forEach(function (initialCard) {
    const element = createCard(initialCard, {deleteCard: removeCard});
    cardsList.append(element);
});
