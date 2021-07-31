import '../index.css'; 

function PopupWithForm (props) {
	return (
		<div className={`popup ${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
    <div className="popup__container"> 
    <button className="popup__close-icon" type="button" onClick={props.onClose}></button>
    <h2 className="popup__title">{props.title}</h2>
    <form className="form form-save" name={props.title} >
    {props.children}
    <button className="form__submit form__submit_loaded" type="submit">{props.submitText}</button>
    </form>
    </div>
    </div>
    )
  }
  export default PopupWithForm