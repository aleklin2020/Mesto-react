import React from "react";
import "../index.css";
import headerVektor from "../image/header/Vector.svg";
import avatar from "../image/profile/image.jpg";
import button from "../image/profile/add-button.svg";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useEffect, useState } from "react";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
function App() {
  const [currentUser, setСurrentUser] = React.useState("");
  React.useEffect(() => {
    api
      .getUserInform()
      .then((data) => {
        setСurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api
      .getIntialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((res) => {
        console.log(`Error:${res}`);
      });
  }, []);
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .LikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateUser(newName) {
    api
      .setUserInform(newName.name, newName.about)
      .then((data) => {
        setСurrentUser(data);
        closeAllPopups();
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    console.log(newAvatar);
    api
      .getAvatarProfile(newAvatar)
      .then((data) => {
        setСurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit(newCard) {
    console.log(newCard);
    api
      .photoAddServer(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  const [IsImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }
  React.useEffect(() => {
    const handleEsc = (e) => {
      const ESC_KEYVODE = 27;
      if (e.keyCode === ESC_KEYVODE) {
        closeAllPopups();
      }
    };
    if (
      isEditProfilePopupOpen === true ||
      isEditAvatarPopupOpen === true ||
      isAddPlacePopupOpen === true ||
      IsImagePopupOpen === true
    ) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [
    isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen,
    IsImagePopupOpen,
  ]);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="content">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />
          <EditProfilePopup
            name="profile-popup"
            title="Редактировать профиль"
            submitText="Сохранить"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={IsImagePopupOpen}
          />
          <PopupWithForm
            name="popup_delete"
            title="Вы уверены"
            submitText="Да"
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;

