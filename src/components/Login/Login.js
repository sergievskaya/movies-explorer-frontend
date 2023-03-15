import React from "react";
import Form from "../Form/Form";
import './Login.css';

function Login() {
    return (
        <Form 
            title='Рады видеть!'
            buttonText='Войти'
            text='Ещё не зарегистрированы?'
            linkText='Регистрация'
            path='signup'
        >
            <fieldset className="form__fields">
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
                        className="form__input"
                        type="password"
                        placeholder="Пароль"
                        minLength="6"
                        required
                    />
                    <span className="form__input-error"></span>
                </div>
            </fieldset>
        </Form>
    );
}

export default Login;