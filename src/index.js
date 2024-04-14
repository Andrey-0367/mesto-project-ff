import './pages/index.css'
import {createCard, deleteCard, likeCard} from "./scripts/card";
import {initialCards} from "./scripts/cards";
import {openPopup, popapElement} from "./scripts/modal";

const cardsList = document.querySelector('.places__list');
const formElement = document.querySelector('.popup_type_edit');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formCard = document.querySelector('.popup_type_new-card')
const titleInput = document.querySelector('.popup__input_type_card-name');
const imageInput = document.querySelector('.popup__input_type_url');
const popup = document.querySelector('.popup_type_image');
const popapImg = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');


nameInput.value = name.textContent;
jobInput.value = job.textContent;

function handleFormSubmit(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    formElement.classList.toggle('popup_is-opened')
}

formElement.addEventListener('submit', handleFormSubmit);

formCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const item = {name: titleInput.value, link: imageInput.value};
    const card =  createCard(item,{deleteCard, likeCard, handleImageClick});
    cardsList.prepend(card);
    titleInput.value = '';
    imageInput.value = '';
    formCard.classList.toggle('popup_is-opened')
});

function handleImageClick(evt){
    popapImg.src = evt.target.src;
    popapImg.alt = evt.target.alt;
    caption.textContent = evt.target.alt;
    openPopup(popup);
}

initialCards.forEach(function (initialCard) {
    const element = createCard(initialCard, {deleteCard, likeCard, handleImageClick});
    cardsList.append(element);
});

popapElement('.profile__edit-button', '.popup_type_edit')
popapElement('.profile__add-button', '.popup_type_new-card')