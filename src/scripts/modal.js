export function openPopup(popup) {
    popup.classList.add('popup_is-opened')
    document.addEventListener('keydown', closePopupKeydown);
    popup.addEventListener('click', closePopupClick);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupKeydown);
    popup.removeEventListener('click', closePopupClick);
}

function closePopupClick(evt) {
    const popup = document.querySelector('.popup_is-opened')
    if ((evt.target.closest('.popup__close')) || (!evt.target.closest('.popup__content'))) {
        closePopup(popup);
    }
}

function closePopupKeydown(evt) {
    const popup = document.querySelector('.popup_is-opened')
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
}
