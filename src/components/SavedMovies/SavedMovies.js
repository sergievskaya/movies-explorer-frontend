import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css';

function SavedMovies({ cards, isLoading, serverError, handleCardDelete, isSaved, handleSearchMovie }) {

    return (
        <main className="saved-movies">
            <SearchForm 
                handleSearchMovie={handleSearchMovie}
            />
            <MoviesCardList  
                cards={cards}
                isLoading={isLoading}
                serverError={serverError}
                handleCardDelete={handleCardDelete}
                isSaved={isSaved}
            />
        </main>
    );
}

export default SavedMovies;