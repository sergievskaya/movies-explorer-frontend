import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css';
import savedMovies from "../../utils/savedMovies"

function SavedMovies() {
    return (
        <main className="saved-movies">
            <SearchForm />
            <MoviesCardList  cards={savedMovies}/>
        </main>
    );
}

export default SavedMovies;