import React from "react";
import './Profile.css';

function Profile() {
    return (
        <section className="profile">
            <h2 className="profile__title">Привет, Виталий!</h2>
            <form className="profile__form">
                <fieldset className="profile__fields">
                    <div className="profile__field">
                        <label className="profile__label">Имя</label>
                        <input className="profile__input" type="text" required defaultValue="Виталий" />
                    </div>
                    <div className="profile__field">
                        <label className="profile__label">E-mail</label>
                        <input className="profile__input" type="email" required defaultValue="pochta@yandex.ru" />
                    </div>
                </fieldset>
                <button className="profile__button profile__button_type_edit" type="button">Редактировать</button>
                <button className="profile__button profile__button_type_logout" type="button">Выйти из аккаунта</button>
            </form>
        </section>
    );
}

export default Profile;

