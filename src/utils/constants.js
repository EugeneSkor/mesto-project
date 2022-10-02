export const avatarEditButton = document.querySelector('.profile__button-edit-avatar');

// User info popup

export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const editButton = document.querySelector('.profile__button-edit');

export const nameInput = document.querySelector('#formFildName');
export const jobInput = document.querySelector('#formFildAbout');

// For new card popup

export const addCardButton = document.querySelector('.profile__button-add');
export const newCardform = document.forms.newPlace;
export const avatarForm = document.forms.changeAvatar;
/*export default initialCards*/

// For API

export const token = {
    baseUrl: "https://nomoreparties.co/v1/cohort-50/",
    headers: {
      authorization: "f77f36fa-4a8e-4899-a241-95c17d5f11a0",
      "Content-Type": "application/json",
    }
  };
