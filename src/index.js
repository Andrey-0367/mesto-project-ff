import './pages/index.css'
import {createCard, deleteCard, handleImageClick, likeCard} from "./scripts/card";
import {initialCards} from "./scripts/cards";
import {popapElement} from "./scripts/modal";

const cardsList = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;
const formElement = document.querySelector('.popup_type_edit');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formCard = document.querySelector('.popup_type_new-card')
const titleInput = document.querySelector('.popup__input_type_card-name');
const imageInput = document.querySelector('.popup__input_type_url');

nameInput.value = name.textContent;
jobInput.value = job.textContent;

function handleFormSubmit(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);

formCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const item = {name: titleInput.value, link: imageInput.value};
    const card =  createCard(item,{deleteCard, likeCard, handleImageClick});
    cardsList.prepend(card);
    titleInput.value = '';
    imageInput.value = '';
});

initialCards.forEach(function (initialCard) {
    const element = createCard(initialCard, {deleteCard, likeCard, handleImageClick});
    cardsList.append(element);
});

popapElement('.profile__edit-button', '.popup_type_edit')
popapElement('.profile__add-button', '.popup_type_new-card')