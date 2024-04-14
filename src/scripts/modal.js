export function openPopup(popup) {
    popup.classList.add('popup_is-opened')
    document.addEventListener('keydown', (evt) => closePopupKeydown(evt,popup));
    popup.addEventListener('click', (evt) => closePopupClick(evt,popup));
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown',(evt) => closePopupKeydown(evt,popup));
    popup.removeEventListener('click', (evt) => closePopupClick(evt,popup));
}

function closePopupClick(evt, popup) {
    if ((evt.target.closest('.popup__close')) || (!evt.target.closest('.popup__content'))) {
        closePopup(popup);
    }
}

function closePopupKeydown(evt, popup) {
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
}

export const popapElement = (triggerSelector, popupSelector) => {
    const trigger = document.querySelector(triggerSelector);
    const popup = document.querySelector(popupSelector);
    trigger.addEventListener('click', () => openPopup(popup));
}