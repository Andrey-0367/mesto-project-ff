import './pages/index.css'
import {createCard, deleteCard, likeCard} from "./scripts/card";
import {initialCards} from "./scripts/cards";
import {closePopup, openPopup} from "./scripts/modal";
import {clearValidation, enableValidation} from "./scripts/validation";

const cardsList = document.querySelector('.places__list');
const formEditProfile = document.querySelector('.popup_type_edit');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formCard = document.querySelector('.popup_type_new-card')
const titleInput = document.querySelector('.popup__input_type_card-name');
const imageInput = document.querySelector('.popup__input_type_url');
const popupZoomImage = document.querySelector('.popup_type_image');
const popapImg = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const formNewPlace = document.forms['new-place']


function submitEditProfileForm(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(formEditProfile);
}

function submitNewPlaceForm(evt) {
    evt.preventDefault();
    const item = {name: titleInput.value, link: imageInput.value};
    const card =  createCard(item,{deleteCard, likeCard, handleImageClick});
    cardsList.prepend(card);
    closePopup(formCard);
}

function handleImageClick(evt){
    popapImg.src = evt.target.src;
    popapImg.alt = evt.target.alt;
    caption.textContent = evt.target.alt;
    openPopup(popupZoomImage);
}

initialCards.forEach(function (initialCard) {
    const element = createCard(initialCard, {deleteCard, likeCard, handleImageClick});
    cardsList.append(element);
});

profileEditButton.addEventListener('click', function () {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    clearValidation(formEditProfile)
    openPopup(formEditProfile);
})

profileAddButton.addEventListener('click', function () {
    formNewPlace.reset();
    clearValidation(formCard);
    openPopup(formCard);
})

enableValidation(submitEditProfileForm, formEditProfile);
enableValidation(submitNewPlaceForm, formCard);
