import { useEffect, useState } from 'react';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {

  const { pathname } = useLocation();

  const [loggedIn, setLoggedIn] = useState(tokenCheck());
  const [currentUser, setCurrentUser] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [moviesError, setMoviesError] = useState('');
  const [savedMoviesError, setSavedMoviesError] = useState(false);

  const [foundMovies, setFoundMovies] = useState([]);
  const [requestText, setRequesText] = useState('');
  const [checkbox, setCheckbox] = useState(false);
 
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);

  useEffect(() => {
    if(loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([userData, movies]) => {
            setCurrentUser(userData);
            setSavedMovies(movies);
            setFoundSavedMovies(movies);
        })
        .catch((err) => {
            console.log(err);
        });
    }   
  }, [loggedIn]);

  useEffect(() => {
    if(loggedIn) {
      setFoundMovies(JSON.parse(localStorage.getItem('foundMovies')));
      setRequesText(localStorage.getItem('requestText'));
      setCheckbox(JSON.parse(localStorage.getItem('checkbox')));
    }
  }, [loggedIn]);

  useEffect(() => {
    setLoggedIn(tokenCheck());
  }, []);

  //проверка токена
  function tokenCheck () {
    const token = localStorage.getItem('jwt');
    if(!token){
        return false;
    } else {
      return true;
    }
  }

  //вход
  function handleAuthorization({email, password}) {
    mainApi.authorize(email, password)
      .then((res) => {
          if(res.token) {
            localStorage.setItem('jwt', res.token);
          } 
          setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //выход
  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('requestText');
    localStorage.removeItem('checkbox');
  }

  //регистрация
  function handleRegistration(data) {
    mainApi.register(data)
      .then(() => {
        handleAuthorization(data.email, data.password);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //обновить информацию пользователя
  function handleUpdateUser({name, email}) {
    mainApi.updateUserInfo(name, email)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //поиск сохраненных фильмов
  function handleSearchSavedMovie(movieName, checkbox) {
    const filterMovies = savedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()));
    const foundMovies = checkbox ? filterMovies.filter((movie) => movie.duration <= 40) : filterMovies;

    if (foundMovies.length === 0) {
      setSavedMoviesError(MovieNotFoundMessage);
    } else {
      setSavedMoviesError('');
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
        localStorage.setItem('checkbox', checkbox);
        setFoundMovies(foundMovies);

        if (foundMovies.length === 0) {
          setMoviesError(MovieNotFoundMessage);
        } else {
          setMoviesError('');
        }
      })
      .catch((err) => {
        console.log(err);
        setMoviesError(serverErrorMessage);
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
        console.log(err);
      })
  }

  function initialFilterMovies() {
    setFoundSavedMovies(savedMovies);
  }

  //проверить сохранён ли фильм
  function isSaved(card) {
    return savedMovies.find(item => item.movieId === card.id);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">

        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ? <Header loggedIn={loggedIn} /> : <></>}

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            cards={foundMovies}
            handleSearchMovie={handleSearchMovie}
            isLoading={isLoading}
            error={moviesError}
            handleCardSave={handleCardSave}
            isSaved={isSaved}
            defaultValueInput={requestText}
            defaultValueCheckbox={checkbox}
          />

          <ProtectedRoute 
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            cards={foundSavedMovies}
            isLoading={isLoading}
            error={savedMoviesError}
            handleCardDelete={handleCardDelete}
            isSaved={isSaved}
            handleSearchMovie={handleSearchSavedMovie}
            initialFilterMovies={initialFilterMovies}
          />

          <ProtectedRoute 
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            handleUpdateUser={handleUpdateUser}
            handleSignOut={handleSignOut}
          />

          <Route path="/signup">
            <Register
              handleRegistration={handleRegistration}
              loggedIn={loggedIn}
            />
          </Route>

          <Route path="/signin">
            <Login
              handleAuthorization={handleAuthorization}
              loggedIn={loggedIn}
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
