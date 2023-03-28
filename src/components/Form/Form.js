import React from "react";
import { Link } from "react-router-dom";
import './Form.css';
import logo from '../../images/logo.svg';


function Form({ title, buttonText, text, linkText, path, children, handleSubmit, isValid, errorMessage, isReqSent }) {
    
    return (
        <section className="form" onSubmit={handleSubmit}>
            <Link to="/" className="form__logo-link">
                <img className="form__logo" src={logo} alt="Логотип Movies Explorer"></img>
            </Link>
            <h2 className="form__title">{title}</h2>
            <form className="form__form">
                {children}
                <div className="form__button-container">
                    <span className="form__error">{(errorMessage && isReqSent) ? errorMessage : ''}</span>
                    <button 
                      className={`form__button ${isValid ? '': 'form__button_disabled'}`} 
                      type="submit" 
                      disabled={!isValid}
                    >
                      {buttonText}
                    </button>
                </div>
                
            </form>
            <p className="form__text">
                {text}
                <Link to={path} className="form__link">{linkText}</Link>
            </p>
        </section>
    );
}

export default Form;