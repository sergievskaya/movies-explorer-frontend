import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import { useFormWithValidation } from '../../utils/UseFormValidation';

function Profile({ handleUpdateUser, handleSignOut, loggedIn, errorMessage }) {

    const { values, handleChange, errors, isValid, setValues } = useFormWithValidation();

    const currentUser = useContext(CurrentUserContext);

    const [isEdit, setIsEdit] = useState(false);
    const [isReqSent, setIsReqSent] = useState(false);

    const inputDisabled = isEdit ? false : true;
    const saveButtonClassName = `profile__button profile__button_type_save ${isValid ? '' : 'profile__button_disabled'}`;
    const responseClassName = `profile__response ${errorMessage ? 'profile__response_type_error' : 'profile__response_type_ok'}`;

    useEffect(() => {
        setValues(currentUser);
    }, [currentUser, setValues]); 

    function handleEditClick() {
        setIsEdit(true);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        handleUpdateUser({
            name: values.name,
            email: values.email
        });
        setIsReqSent(true);
    }

    if (!loggedIn) {
        return <Redirect to="/"/>
    }

    return (
        <section className="profile">
            <h2 className="profile__title">Привет, {currentUser.name}!</h2>
            <form className="profile__form" onSubmit={handleSubmit}>
                <fieldset className="profile__fields">
                    <div className="profile__field">
                        <label className="profile__label">Имя</label>
                        <input 
                            name="name"
                            className="profile__input"
                            type="text"
                            required
                            value={values.name || ''}
                            onChange={handleChange}
                            disabled={inputDisabled}
                            minLength="2"
                            maxLength="30"

                        />
                    </div>
                    <span className="profile__input-error">{errors.name}</span>
                    <div className="profile__field">
                        <label className="profile__label">E-mail</label>
                        <input
                            name="email"
                            className="profile__input"
                            type="email"
                            required
                            value={values.email || ''}
                            onChange={handleChange}
                            disabled={inputDisabled}
                        />
                    </div>
                    <span className="profile__input-error">{errors.email}</span>
                </fieldset>
                
                {isEdit ? (
                    <>
                    <span className={responseClassName}>{isReqSent ? errorMessage || 'Изменения сохранены': ''}</span>
                    <button className={saveButtonClassName} type="submit">Сохранить</button>
                    </>
                ) : (
                    <>
                        <button className="profile__button profile__button_type_edit" type="button" onClick={handleEditClick}>Редактировать</button>
                        <button className="profile__button profile__button_type_logout" type="button" onClick={handleSignOut}>Выйти из аккаунта</button>
                    </>
                )}
                
            </form>
        </section>
    );
}

export default Profile;

