import React from 'react';
import '../index.css';
import avatar from "../image/profile/image.jpg"
import button from "../image/profile/add-button.svg"
import Card from "./Card.js"
import api from "../utils/Api.js"

function Main (props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription , setUserDescription ] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  React.useEffect(()=>{
    api.getUserInform()
    .then(res=>{
      setUserName(res.name)
      setUserDescription(res.about)
      setUserAvatar(res.avatar)
    })
    .catch(res=>{
      console.log(`Error:${res}`)
    })
  },[])
  const [cards, setCards] = React.useState([])
  React.useEffect(()=>{
    api.getIntialCards()
    .then(res =>{
      setCards(res)
    })
    .catch(res=>{
      console.log(`Error:${res}`)
    })
  }
  ,[])
  return (
    <main className="main">
    <section className="profile-informashion">
    <div className="profile">
    <div className="profile-page">
    <button className="profile__avatar-button" onClick={props.onEditAvatar}>
    <img className="profile__avatar" alt="Аватарка"   src={userAvatar}/>
    </button>
    </div>
    <div className="profile__info">
    <div className="profile__box">
    <h1 className="profile__name">{userName}</h1>
    <button className="profile__bedit-button" type="button" onClick={props.onEditProfile} ></button> 
    </div>
    <p className="profile__profession">{userDescription}</p>
    </div>
    </div>
    <button className="profile-informashion__button" name="editing" type="button" onClick={props.onAddPlace}>
    <img alt="Кнопка" src={button}/>
    </button>
    </section>   
    <section className="elements">
    {cards.map((item) => (
      <Card key={item._id} card={item} onCardClick={props.onCardClick}/>
      ))}    
    </section>         
    </main>
    )
}
export default Main;