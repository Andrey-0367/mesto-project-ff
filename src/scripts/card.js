import {cardTemplate} from "../index";
import {openModal} from "./modal";

export function createCard(item, {deleteCard, likeCard, handleImageClick}) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image')

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    cardElement.querySelector('.card__image').addEventListener('click',handleImageClick);

    console.log( cardElement.querySelector('.card__image'))

    return cardElement;
}

export function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export function handleImageClick(evt) {

    const popap = document.querySelector('.popup_type_image')
    const popapImg = document.querySelector('.popup__image');
    const caption = document.querySelector('.popup__caption');
    popapImg.src = evt.target.src;
    popapImg.alt = evt.target.alt;
    caption.textContent = evt.target.alt;
    openModal(evt, popap);
}