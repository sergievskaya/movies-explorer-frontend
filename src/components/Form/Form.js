import React from "react";
import { Link } from "react-router-dom";
import './Form.css';
import logo from '../../images/logo.svg';


function Form({ title, buttonText, text, linkText, path, children }) {
    return (
        <section className="form">
            <Link to="/" className="form__logo-link">
                <img className="form__logo" src={logo} alt="Логотип Movies Explorer"></img>
            </Link>
            <h2 className="form__title">{title}</h2>
            <form className="form__form">
                {children}
                <button className="form__button" type="submit">{buttonText}</button>
            </form>
            <p className="form__text">
                {text}
                <Link to={path} className="form__link">{linkText}</Link>
            </p>
        </section>
    );
}

export default Form;