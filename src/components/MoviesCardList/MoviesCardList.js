import React from "react";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';
import { useLocation } from "react-router-dom";

function MoviesCardList({ cards, isLoading, serverError, handleCardSave, handleCardDelete, isSaved }) {

    const { pathname } = useLocation();

    if (isLoading) return <Preloader />

    return (
        <section className="cards">
            {serverError ? (
                <span className="cards__error-text">{serverError}</span>
            ) : (
                <ul className="cards__list">
                    {cards.map((card) => (  
                        <MoviesCard 
                            key={pathname === '/movies' ? card.id : card._id} 
                            card={card}
                            handleCardSave={handleCardSave}
                            handleCardDelete={handleCardDelete}
                            isSaved={isSaved}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
}

export default MoviesCardList;