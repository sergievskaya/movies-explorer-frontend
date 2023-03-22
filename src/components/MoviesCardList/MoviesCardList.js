import React from "react";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

function MoviesCardList({ cards, isLoading, serverError }) {
    let content;

    if (isLoading) {
        content = <Preloader />;
    } else if (serverError) {
        content = (
            <span className="cards__error-text">
                Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. 
                Подождите немного и попробуйте ещё раз
            </span>
        );   
    } else if (cards.length === 0) {  
        content = <span className="cards__error-text">Ничего не найдено</span>;
    
    } else {
        content = (
            <ul className="cards__list">
                {cards.map((card) => (
                    <MoviesCard 
                        key={card.id} 
                        card={card} 
                />
                ))}
            </ul>
        );
    }

    return (
        <section className="cards">
            {content}
        </section>
    );
}

export default MoviesCardList;