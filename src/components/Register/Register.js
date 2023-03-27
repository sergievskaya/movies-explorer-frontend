import { useState } from "react";
import { Redirect } from "react-router-dom";
import Form from "../Form/Form";
import './Register.css';

function Register({ handleRegistration, loggedIn }) {

    const[name, setName] = useState('');
    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        handleRegistration({name, email, password});
    }

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    if (loggedIn) {
        return <Redirect to="/movies"/>
    }

    return (
        <Form 
            title='Добро пожаловать!'
            buttonText='Зарегистрироваться'
            text='Уже зарегистрированы?'
            linkText='Войти'
            path='/signin'
            handleSubmit={handleSubmit}
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
                        onChange={handleNameChange}
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
                        onChange={handleEmailChange}
                    />
                    <span className="form__input-error"></span>
                </div>
                <div className= "form__field">
                    <label className="form__label">Пароль</label>
                    <input
                        className="form__input"
                        type="password"
                        required
                        placeholder="Пароль"
                        minLength="6"
                        onChange={handlePasswordChange}
                    />
                    <span className="form__input-error"></span>
                </div>
            </fieldset>
        </Form>
    );
}

export default Register;