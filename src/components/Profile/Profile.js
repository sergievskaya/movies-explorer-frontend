import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

function Profile({ handleUpdateUser }) {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const inputDisabled = isEdit ? false : true;

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]); 

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handleEditClick() {
        setIsEdit(true);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        handleUpdateUser(name, email);
    }

    return (
        <section className="profile">
            <h2 className="profile__title">Привет, {currentUser.name}!</h2>
            <form className="profile__form" onSubmit={handleSubmit}>
                <fieldset className="profile__fields">
                    <div className="profile__field">
                        <label className="profile__label">Имя</label>
                        <input 
                            className="profile__input"
                            type="text"
                            required
                            value={name || ''}
                            disabled={inputDisabled}
                            onChange={handleNameChange}
                            minLength="2"
                            maxLength="30"

                        />
                    </div>
                    <div className="profile__field">
                        <label className="profile__label">E-mail</label>
                        <input
                            className="profile__input"
                            type="email"
                            required
                            value={email || ''} 
                            disabled={inputDisabled}
                            onChange={handleEmailChange}
                        />
                    </div>
                </fieldset>
                
                {isEdit ? (
                    <button className="profile__button profile__button_type_save" type="submit">Сохранить</button>
                ) : (
                    <>
                        <button className="profile__button profile__button_type_edit" type="button" onClick={handleEditClick}>Редактировать</button>
                        <button className="profile__button profile__button_type_logout" type="button">Выйти из аккаунта</button>
                    </>
                )}
                
            </form>
        </section>
    );
}

export default Profile;

