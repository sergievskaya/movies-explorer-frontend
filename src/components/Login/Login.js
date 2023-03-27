import { useState } from "react";
import { Redirect } from "react-router-dom";
import Form from "../Form/Form";
import './Login.css';

function Login({ handleAuthorization, loggedIn }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        handleAuthorization(email, password);
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
            title='Рады видеть!'
            buttonText='Войти'
            text='Ещё не зарегистрированы?'
            linkText='Регистрация'
            path='signup'
            handleSubmit={handleSubmit}
        >
            <fieldset className="form__fields">
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
                        placeholder="Пароль"
                        minLength="6"
                        required
                        onChange={handlePasswordChange}
                    />
                    <span className="form__input-error"></span>
                </div>
            </fieldset>
        </Form>
    );
}

export default Login;