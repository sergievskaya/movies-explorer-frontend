import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import movies from "../../utils/movies"

function Movies() {
    return (
        <main className="movies">
            <SearchForm />
            <MoviesCardList cards={movies} />
            <div className="movies__button-container">
                <button className="movies__button" type="button">Ещё</button>
            </div>
        </main>
    );
}

export default Movies;