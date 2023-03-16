import React from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';

function MoviesCard({ card }) {
    const { pathname } = useLocation();

    const buttonClassName = `card__button ${pathname === '/movies' ? 'card__button_type_inactive' : 'card__button_type_delete'}`;

    return (
       <li className="card">
            <div className="card__container">
                <div className="card__info">
                    <p className="card__name">{card.title}</p>
                    <p className="card__duration">1ч 47м</p>
                </div>
                <button className={buttonClassName} type="button"></button>
            </div>
            <img className="card__image" alt="Постер фильма"  src={card.image} />
       </li>
    );
}

export default MoviesCard;