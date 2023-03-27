import React from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';

function MoviesCard({ card, handleCardSave, handleCardDelete, isSaved }) {
    const { pathname } = useLocation();

    const saveButtonClassName = `card__button ${isSaved(card) ? 'card__button_type_active' : 'card__button_type_inactive'}`; 

    const cardImage = pathname === '/movies' ? `https://api.nomoreparties.co/${card.image.url}` : card.image;

    function calculateDuration() {
        const minutes = card.duration;

        if (minutes === (60 || 120 || 180)) {
            return `${(minutes / 60)}ч`
        } else if (minutes > 60) {
            return `${Math.floor(minutes / 60)}ч ${minutes % 60}м`;
        } else if (minutes < 60) {
            return `${minutes}м`;
        }
    }

    function handleSaveClick() {
        handleCardSave(card);
    }

    function handleDeleteClick() {
        handleCardDelete(card);
    }

    return (
       <li className="card">
            <div className="card__container">
                <div className="card__info">
                    <p className="card__name">{card.nameRU}</p>
                    <p className="card__duration">{calculateDuration()}</p>
                </div>
                
                {pathname === '/movies' ? (
                    <button className={saveButtonClassName} type="button" onClick={handleSaveClick}></button>
                ) : (
                    <button className="card__button card__button_type_delete" type="button" onClick={handleDeleteClick}></button>
                )}
            </div>
            <a className="card__trailer-link" href={card.trailerLink} target="_blank" rel="noreferrer">
                <img className="card__image" alt="Постер фильма"  src={cardImage} />
            </a>
       </li>
    );
}

export default MoviesCard;