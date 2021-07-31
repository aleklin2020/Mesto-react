import React from 'react';
import '../index.css';
import headerVektor from "../image/header/Vector.svg"
import avatar from "../image/profile/image.jpg"
import button from "../image/profile/add-button.svg"
import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import PopupWithForm from "./PopupWithForm.js"
import ImagePopup from "./ImagePopup.js"
import Card from "./Card.js"
function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick (){
    setIsEditAvatarPopupOpen(true)
  }
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick (){
   setIsEditProfilePopupOpen (true)
 }
 const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
 function handleAddPlaceClick (){
  setIsAddPlacePopupOpen(true)
}
const [IsImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
const [selectedCard, setSelectedCard] = React.useState({})
function handleCardClick (card) {
  setSelectedCard(card)
  setIsImagePopupOpen(true)
}
function closeAllPopups(){
  setIsEditProfilePopupOpen (false)
  setIsAddPlacePopupOpen(false)
  setIsEditAvatarPopupOpen(false)
  setIsImagePopupOpen(false);
  setSelectedCard({})
}
React.useEffect(() => {
  const handleEsc = (e) => {
    const btnEscape = 27;
    if (e.keyCode === btnEscape) {
      closeAllPopups()
    }
  };
  if (isEditProfilePopupOpen === true || isEditAvatarPopupOpen === true || isAddPlacePopupOpen === true || IsImagePopupOpen === true) {
    window.addEventListener('keydown', handleEsc);
  };
  return () => {
    window.removeEventListener('keydown', handleEsc);
  };
}, [isEditProfilePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen, IsImagePopupOpen]);
return (
  <div className="page">
  <div className="content">
  <Header />
  <Main 
  onEditAvatar={handleEditAvatarClick}
  onEditProfile={handleEditProfileClick}
  onAddPlace ={handleAddPlaceClick}
  onCardClick={handleCardClick}
  />
  <Footer />
  <PopupWithForm name="profile-popup" title="Редактировать профиль" submitText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} >
  <label className="form__label">
  <input className="form__input form__input_name" id="form-name-input" type="text" name="name" placeholder="Имя" required  />
  <span className="form-name-input-error"></span>
  </label>
  <label className="form__label">
  <input className="form__input form__input_job" lang="ru" id="form-job-input" type="text" name="profession"  required  placeholder="О себе" />
  <span className="form-job-input-error" lang="ru"></span>
  </label>
  </PopupWithForm>
  <PopupWithForm name="popup_element" title="Новое место" submitText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} >
  <label className="form__label">
  <input className="form__input form__input_name" id="form-name-input" type="text" name="name" placeholder="Имя" required  />
  <span className="form-name-input-error"></span>
  </label>
  <label className="form__label">
  <input className="form__input form__input_job" lang="ru" id="form-job-input" type="text" name="profession"  required  placeholder="О себе" />
  <span className="form-job-input-error" lang="ru"></span>
  </label>
  </PopupWithForm>
  <PopupWithForm name="popup_avatar" title="Обновить аватар" submitText="Cохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} >
  <label className="form__label">
  <input className="form__input form__input_job form__input-active" id="form-link-avatar" type="url" name="linkAvatar" placeholder="Ссылка на картинку" required />
  <span className="form-link-avatar-error"></span>
  </label>
  </PopupWithForm>
  <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={IsImagePopupOpen}/>
  <PopupWithForm name="popup_delete" title="Вы уверены" submitText="Да"  onClose={closeAllPopups} />
  </div>
  </div>
  );
}
export default App;