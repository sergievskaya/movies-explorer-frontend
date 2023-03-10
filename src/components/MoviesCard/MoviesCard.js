import React from "react";
import './MoviesCard.css';
import cardImage from '../../images/movie-image.jpg';

function MoviesCard() {
    return (
       <li className="card">
            <div className="card__container">
                <div className="card__info">
                    <p className="card__name">33 слова о дизайне</p>
                    <p className="card__duration">1ч 47м</p>
                </div>
                <button className="card__button card__button_type_active" type="button"></button>
            </div>
            <img className="card__image" alt="Постер фильма"  src={cardImage} />
       </li>
    );
}

export default MoviesCard;