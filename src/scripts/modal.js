export const openModal = (evt, popup) => {
        evt.preventDefault()
        popup.classList.add('popup_is-opened')
    }

export const popapElement = (triggerSelector, popupSelector) => {
    const trigger = document.querySelector(triggerSelector)
    const popup = document.querySelector(popupSelector)
    trigger.addEventListener('click', (evt) => openModal(evt, popup))
}

export const closeModal = () => {
    const popups = document.querySelectorAll('.popup')
    popups.forEach(element => {
        document.addEventListener('keydown', function (evt) {
            if (evt.key === 'Escape') {
                element.classList.toggle('popup_is-opened');
            }
        });
        element.addEventListener('click', function (evt) {
            if ((evt.target.closest('.popup__close')) || (!evt.target.closest('.popup__content'))) {
                element.classList.toggle('popup_is-opened');
            }
        });

    });
};

closeModal()


