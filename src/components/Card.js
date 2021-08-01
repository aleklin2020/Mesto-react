import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <div className="element">
      <button className="elemenet__icon-delete"></button>
      <img
        className="element__image"
        alt={props.card.name}
        src={props.card.link}
        onClick={handleClick}
      />
      <h2 className="element__title">{props.card.name}</h2>
      <div className="element__likes">
        <button className="element__vector-like" type="button"></button>
        <p className="element__like">{props.card.likes.length}</p>
      </div>
    </div>
  );
}
export default Card;