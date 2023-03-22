import React, { useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';

function Movies({handleResize, handleSearchMovie, cards, isLoading, serverError, handleMoreClick}) {

    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));

    useEffect(() => {
       
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <main className="movies">
            <SearchForm 
                handleSearchMovie={handleSearchMovie}
            />
            <MoviesCardList 
                cards={cards}
                isLoading={isLoading}
                serverError={serverError}
            />
            {cards.length < foundMovies.length ? (
            <div className="movies__button-container">
                <button className="movies__button" type="button" onClick={handleMoreClick}>Ещё</button>
            </div>
            ) : ''}
        </main>
    );
}

export default Movies;