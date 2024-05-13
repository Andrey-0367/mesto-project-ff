(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,r){var o=r.deleteCard,c=r.likeCard,a=r.handleImageClick,u=e.cloneNode(!0),i=u.querySelector(".card__image"),l=u.querySelector(".card__delete-button"),s=u.querySelector(".card__like-button"),d=u.querySelector(".card__like-button-amount");return n._id!==t.owner._id&&l.remove(),t.likes.some((function(e){return e._id===n._id}))&&s.classList.add("card__like-button_is-active"),d.textContent=t.likes.length,i.src=t.link,i.alt=t.name,u.querySelector("li").id="id"+t._id,u.querySelector(".card__title").textContent=t.name,l.addEventListener("click",o(t)),s.addEventListener("click",c(t,n,d)),u.querySelector(".card__image").addEventListener("click",a),u}function n(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c),e.addEventListener("click",o)}function r(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c),e.removeEventListener("click",o)}function o(e){(e.target.classList.contains("popup__close")||e.target.classList.contains("popup"))&&r(e.currentTarget)}function c(e){var t=document.querySelector(".popup_is-opened");"Escape"===e.key&&r(t)}var a={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},u=function(e,t,n){var r=t.querySelector(".".concat(n.id,"-error"));n.classList.remove(e.inputErrorClass),r.classList.remove(e.errorClass),r.textContent=""},i=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.disabled=!1,n.classList.remove(e.inactiveButtonClass)):(n.disabled=!0,n.classList.add(e.inactiveButtonClass))};!function(e){document.querySelectorAll(e.formSelector).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);i(e,n,r),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?u(e,t,n):function(e,t,n,r){var o=t.querySelector(".".concat(n.id,"-error"));n.classList.add(e.inputErrorClass),o.textContent=r,o.classList.add(e.errorClass)}(e,t,n,n.validationMessage)}(e,t,o),i(e,n,r)}))}))}(e,t)}))}(a);var l=function(e,t){var n=e.querySelector(t.submitButtonSelector),r=Array.from(e.querySelectorAll(t.inputSelector));r.forEach((function(o){u(t,e,o),i(t,r,n)}))},s={baseUrl:"https://nomoreparties.co/v1/wff-cohort-13",headers:{authorization:"52146976-fe6f-4cd8-b4d3-b5f95bdd9966","Content-Type":"application/json"}},d=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},p=fetch("".concat(s.baseUrl,"/users/me"),{headers:s.headers}).then(d),f=fetch("".concat(s.baseUrl,"/cards"),{headers:s.headers}).then(d);function m(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:s.headers}).then(d)}function _(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:s.headers}).then(d)}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var v=document.querySelector(".popup__image"),h=document.querySelector(".popup__caption"),S=document.querySelector(".places__list"),b=document.querySelector(".popup_type_edit"),C=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),g=document.querySelector(".popup__input_type_name"),k=document.querySelector(".popup__input_type_description"),E=document.querySelector(".popup_type_new-card"),L=document.querySelector(".popup__input_type_card-name"),x=document.querySelector(".popup__input_type_url"),T=document.querySelector(".popup_type_image"),D=document.querySelector(".profile__edit-button"),A=document.querySelector(".profile__add-button"),w=document.forms["new-place"],U=document.forms["new-avatar_image"],j=document.querySelector(".profile__image"),I=document.querySelector(".profile__image-button"),O=document.querySelector(".popup__input_type_src"),B=document.querySelector(".popup_avatar_image"),P=document.querySelector(".popup__button-avatar"),M=document.querySelector(".popup__button-edit-profile"),N=document.querySelector(".popup__button-new-place"),J=document.querySelector(".popup_card_delete"),H=document.querySelector(".popup__button-card-delete"),V={itemToDelete:null},z=function(e,t,n){return function(r){return r.preventDefault(),(e.likes.some((function(e){return e._id===t._id}))?_:m)(e._id).then((function(t){r.target.classList.toggle("card__like-button_is-active"),n.textContent=t.likes.length,e.likes=t.likes})).catch((function(e){return console.log(e)}))}},$=function(e){return function(t){t.preventDefault(),V.itemToDelete=e,n(J)}};function F(e){v.src=e.target.src,v.alt=e.target.alt,h.textContent=e.target.alt,n(T)}H.addEventListener("click",(function(e){var t;V.itemToDelete?((t=V.itemToDelete._id,fetch("".concat(s.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:s.headers}).then(d)).then((function(e){return e})).catch((function(e){return console.error(e)})),document.querySelector("#id"+V.itemToDelete._id).remove(),V.itemToDelete=null,r(J)):console.error("Не могу удалить элемент, который не сохранен в state!")})),I.addEventListener("click",(function(e){U.reset(),l(B,a),n(B)})),D.addEventListener("click",(function(){g.value=C.textContent,k.value=q.textContent,l(b,a),n(b)})),A.addEventListener("click",(function(){w.reset(),l(E,a),n(E)})),Promise.all([p,f]).then((function(e){var n,o,c=(o=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(n,o)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(n,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0],u=c[1];C.textContent=a.name,q.textContent=a.about,j.style.backgroundImage="url(".concat(a.avatar,")"),G((function(e){var n;e.preventDefault(),N.textContent="Сохранение...",(n={name:L.value,link:x.value},fetch("".concat(s.baseUrl,"/cards"),{method:"POST",headers:s.headers,body:JSON.stringify({name:n.name,link:n.link})}).then(d)).then((function(e){return e})).then((function(e){var n=t(e,a,{deleteCard:$,likeCard:z,handleImageClick:F});S.prepend(n)})).catch((function(e){return console.error(e)})).finally((function(){N.textContent="Сохранить",r(E)}))}),E),u.forEach((function(e){var n=t(e,a,{deleteCard:$,likeCard:z,handleImageClick:F});S.append(n)}))})).catch((function(e){return console.error(e)}));var G=function(e,t){t.addEventListener("submit",e)};G((function(e){var t;e.preventDefault(),M.textContent="Сохранение...",(t={name:g.value,about:k.value},fetch("".concat(s.baseUrl,"/users/me"),{method:"PATCH",headers:s.headers,body:JSON.stringify({name:t.name,about:t.about})}).then(d)).then((function(e){C.textContent=e.name,q.textContent=e.about})).catch((function(e){return console.error(e)})).finally((function(){M.textContent="Сохранить",r(b)}))}),b),G((function(e){var t;e.preventDefault(),P.textContent="Сохранение...",(t={avatar:O.value},fetch("".concat(s.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:s.headers,body:JSON.stringify({avatar:t.avatar})}).then(d)).then((function(e){j.style.backgroundImage="url(".concat(e.avatar,")")})).catch((function(e){return console.error(e)})).finally((function(){P.textContent="Сохранить",r(B)}))}),B)})();