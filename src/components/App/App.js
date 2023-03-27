import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Route, Switch, useLocation } from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { MovieNotFoundMessage, serverErrorMessage } from '../../utils/constans';

function App() {

  const { pathname } = useLocation();

  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [requestText, setRequesText] = useState('');
  const [shortFilm, setShortFilm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
        Promise.all([mainApi.getUserInfo()])
        .then(([userData]) => {
            setCurrentUser(userData);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        });
  }, []);

  useEffect(() => {
    mainApi.getSavedMovies()
    .then((movies)=> {
      setSavedMovies(movies);
      setFoundSavedMovies(movies);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
  }, []);

  useEffect(() => {
    setMovies(JSON.parse(localStorage.getItem('foundMovies')));
    setRequesText(localStorage.getItem('requestText'));
    setShortFilm(JSON.parse(localStorage.getItem('shortFilm')));
  }, []);

  //обновить информацию пользователя
  function handleUpdateUser(name, email) {
    mainApi.updateUserInfo(name, email)
      .then((userData) => {
        console.log('запрос прошёл')
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  //поиск сохраненных фильмов
  function handleSearchSavedMovie(movieName, checkbox) {
    const filterMovies = savedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()));
    const foundMovies = checkbox ? filterMovies.filter((movie) => movie.duration <= 40) : filterMovies;

    if (foundMovies.length === 0) {
      setServerError(MovieNotFoundMessage);
    } else {
      setServerError('');
    }

    setFoundSavedMovies(foundMovies);
  }

  //поиск фильмов
  function handleSearchMovie(movieName, checkbox) {
    setIsLoading(true)
    moviesApi.getMovies()
      .then((movies) => {
        const filterMovies = movies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()));
        const foundMovies = checkbox ? filterMovies.filter((movie) => movie.duration <= 40) : filterMovies;
        localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
        localStorage.setItem('requestText', movieName);
        localStorage.setItem('shortFilm', checkbox);
        setMovies(foundMovies)

        if (foundMovies.length === 0) {
          setServerError(MovieNotFoundMessage);
        } else {
          setServerError('');
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setServerError(serverErrorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //сохранить фильм
  function handleCardSave(card) {
    //если карточка уже сохранена то удалить её
    const savedCard = isSaved(card);

    if (savedCard) {
      handleCardDelete(savedCard);
      return;
    }

    mainApi.addMovie(card)
      .then((savedMovie)=> {
        setSavedMovies([...savedMovies, savedMovie]);
        setFoundSavedMovies([...savedMovies, savedMovie]);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  //удалить фильм
  function handleCardDelete(card) {
    mainApi.deleteMovie(card)
      .then(()=> {
        setSavedMovies(savedMovies.filter(item => item._id !== card._id));
        setFoundSavedMovies(foundSavedMovies.filter(item => item._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  //проверить сохранён ли фильм
  function isSaved(card) {
    return savedMovies.find(item => item.movieId === card.id);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">

        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ? <Header /> : <></>}

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <Route path="/movies">
            <Movies
              cards={movies}
              handleSearchMovie={handleSearchMovie}
              isLoading={isLoading}
              serverError={serverError}
              handleCardSave={handleCardSave}
              isSaved={isSaved}
              defaultValueInput={requestText}
              defaultValueCheckbox={shortFilm}
            />
          </Route> 
          <Route path="/saved-movies">
            <SavedMovies
              cards={foundSavedMovies}
              isLoading={isLoading}
              serverError={serverError}
              handleCardDelete={handleCardDelete}
              isSaved={isSaved}
              handleSearchMovie={handleSearchSavedMovie}
            />
          </Route>

          <Route path="/signup">
            <Register />
          </Route>

          <Route path="/signin">
            <Login />
          </Route>

          <Route path="/profile">
            <Profile 
              handleUpdateUser={handleUpdateUser}
            />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer /> : <></>}

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
