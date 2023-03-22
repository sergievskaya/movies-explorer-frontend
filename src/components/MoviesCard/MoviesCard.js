import React from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';

function MoviesCard({ card }) {
    const { pathname } = useLocation();

    const buttonClassName = `card__button ${pathname === '/movies' ? 'card__button_type_inactive' : 'card__button_type_delete'}`;

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

    return (
       <li className="card">
            <div className="card__container">
                <div className="card__info">
                    <p className="card__name">{card.nameRU}</p>
                    <p className="card__duration">{calculateDuration()}</p>
                </div>
                <button className={buttonClassName} type="button"></button>
            </div>
            <a className="card__trailer-link" href={card.trailerLink} target="_blank" rel="noreferrer">
                <img className="card__image" alt="Постер фильма"  src={`https://api.nomoreparties.co${card.image.url}`} />
            </a>
       </li>
    );
}

export default MoviesCard;