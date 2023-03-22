import React, { useState } from 'react';
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

function App() {

  const { pathname } = useLocation();

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [moreCards, setMoreCards] = useState(0);

  function handleSearchMovie(movieName, checkbox) {
    setIsLoading(true)
    moviesApi.getMovies()
      .then((movies) => {
        const filterMovies = movies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()));
        const foundMovies = checkbox ? filterMovies.filter((movie) => movie.duration <= 40) : filterMovies;
        localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
        setServerError(false);
        handleResize();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setServerError(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }


  function handleResize() {
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));
    const windowWidth = window.innerWidth;

    if (!foundMovies) {
      return
    }

    if (windowWidth >= 1280) {
      setMovies(foundMovies.slice(0, 12));
      setMoreCards(3);
  
    } else if (windowWidth > 700 && windowWidth < 1280) {
      setMovies(foundMovies.slice(0, 8));
      setMoreCards(2);

    } else if (windowWidth <= 700) {
      setMovies(foundMovies.slice(0, 5));
      setMoreCards(2);

    }
  }

  function handleMoreClick() {
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'))
    setMovies(foundMovies.slice(0, movies.length + moreCards))
  }


  return (
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
            handleResize={handleResize}
            isLoading={isLoading}
            serverError={serverError}
            handleMoreClick={handleMoreClick}
          />
        </Route> 
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>

        <Route path="/signup">
          <Register />
        </Route>

        <Route path="/signin">
          <Login />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      
      {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer /> : <></>}
    </div>
  );
}

export default App;
