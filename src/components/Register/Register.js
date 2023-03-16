import React from "react";
import Form from "../Form/Form";
import './Register.css';

function Register() {
    return (
        <Form 
            title='Добро пожаловать!'
            buttonText='Зарегистрироваться'
            text='Уже зарегистрированы?'
            linkText='Войти'
            path='/signin'
        >
            <fieldset className="form__fields">
                <div className="form__field">
                    <label className="form__label">Имя</label>
                    <input
                        className="form__input"
                        type="text"
                        required
                        placeholder="Имя"
                        minLength="2"
                        maxLength="30"
                        defaultValue="Виталий"
                    />
                    <span className="form__input-error"></span>
                </div>
                <div className= "form__field">
                    <label className="form__label">E-mail</label>
                    <input
                        className="form__input"
                        type="email"
                        required
                        placeholder="E-mail"
                        defaultValue="pochta@yandex.ru"
                    />
                    <span className="form__input-error"></span>
                </div>
                <div className= "form__field">
                    <label className="form__label">Пароль</label>
                    <input
                        className="form__input form__input_color-error"
                        type="password"
                        required
                        placeholder="Пароль"
                        minLength="6"
                        defaultValue="12345678" 
                    />
                    <span className="form__input-error">что-то пошло не так...</span>
                </div>
            </fieldset>
        </Form>
    );
}

export default Register;