// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const cardsList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


initialCards.forEach(function (element) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__image').src = element.link;

    cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
        let item = evt.target.closest('.places__item');
        item.remove()
    });

    cardsList.append(cardElement)
})
