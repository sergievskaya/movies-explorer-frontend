import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';

function Movies({ cards,  isLoading, error, handleCardSave, isSaved, handleSearchMovie, defaultValueInput, defaultValueCheckbox }) {

    const [movies, setMovies] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [moreCards, setMoreCards] = useState(0);

    useEffect(() => {
        if (!cards) {
            return
        }
      
        if (windowWidth >= 1280) {
            setMovies(cards.slice(0, 12));
            setMoreCards(3);
        
          } else if (windowWidth > 700 && windowWidth < 1280) {
            setMovies(cards.slice(0, 8));
            setMoreCards(2);
      
          } else if (windowWidth <= 700) {
            setMovies(cards.slice(0, 5));
            setMoreCards(2);
      
          }
    }, [cards, windowWidth]);
    
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function handleResize() {
        setTimeout(() => setWindowWidth(window.innerWidth), 2000);
    }

    function handleMoreClick() {
        const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));
        setMovies(foundMovies.slice(0, movies.length + moreCards));
    }

    return (
        <main className="movies">
            <SearchForm 
                handleSearchMovie={handleSearchMovie}
                defaultValueInput={defaultValueInput}
                defaultValueCheckbox={defaultValueCheckbox}
            />
            <MoviesCardList 
                cards={movies}
                isLoading={isLoading}
                error={error}
                handleCardSave={handleCardSave}
                isSaved={isSaved}
            />
            { movies.length > 0 && movies.length < cards.length ? (
            <div className="movies__button-container">
                <button className="movies__button" type="button" onClick={handleMoreClick}>Ещё</button>
            </div>
            ) : ''}
        </main>
    );
}

export default Movies;