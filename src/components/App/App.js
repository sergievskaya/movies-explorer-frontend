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
import { 
  movieNotFoundMessage, 
  serverErrorMessage,
  conflictErrorMessage,
  updateUserErrorMessage,
  loginErrorMessage,
  registerErrorMessage,

} from '../../utils/constans';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {

  const { pathname } = useLocation();

  const [loggedIn, setLoggedIn] = useState(tokenCheck());
  const [currentUser, setCurrentUser] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [moviesError, setMoviesError] = useState('');
  const [savedMoviesError, setSavedMoviesError] = useState(false);
  const [updateUserError, setUpdateUserError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const [foundMovies, setFoundMovies] = useState([]);
  const [requestText, setRequestText] = useState('');
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
          console.log(`Oшибка: ${err.status} ${err.statusText}`);
        });
    }   
  }, [loggedIn]);

  useEffect(() => {
    if(loggedIn) {
      setFoundMovies(JSON.parse(localStorage.getItem('foundMovies')) || []);
      setRequestText(localStorage.getItem('requestText'));
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
          setLoginError('');
      })
      .catch((err) => {
        console.log(`Oшибка: ${err.status} ${err.statusText}`);
        setLoginError(loginErrorMessage);
      });
  }

  //выход
  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('requestText');
    localStorage.removeItem('checkbox');
    localStorage.removeItem('allMovies');
    setFoundMovies([]);
    setCheckbox(false);
    setRequestText('');
  }

  //регистрация
  function handleRegistration(data) {
    mainApi.register(data)
      .then(() => {
        handleAuthorization({
          email: data.email,
          password: data.password
        });
        setLoginError('');
      })
      .catch((err) => {
        console.log(`Oшибка: ${err.status} ${err.statusText}`);
        if (err.status === 409) {
          setRegisterError(conflictErrorMessage);
        } else {
          setRegisterError(registerErrorMessage);
        }
      });
  }

  //обновить информацию пользователя
  function handleUpdateUser({name, email}) {
    mainApi.updateUserInfo(name, email)
      .then((userData) => {
        setCurrentUser(userData);
        setUpdateUserError('');
      })
      .catch((err) => {
        console.log(`Oшибка: ${err.status} ${err.statusText}`);
        if (err.status === 409) {
          setUpdateUserError(conflictErrorMessage);
        } else {
          setUpdateUserError(updateUserErrorMessage);
        }
      })
  }

  //поиск сохраненных фильмов
  function handleSearchSavedMovie(movieName, checkbox) {
    const filterMovies = savedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()));
    const foundMovies = checkbox ? filterMovies.filter((movie) => movie.duration <= 40) : filterMovies;

    if (foundMovies.length === 0) {
      setSavedMoviesError(movieNotFoundMessage);
    } else {
      setSavedMoviesError('');
    }

    setFoundSavedMovies(foundMovies);
  }

  function filterMovies(movieName, checkbox) {
    const allMovies = JSON.parse(localStorage.getItem('allMovies')) || [];
    const filterMovies = allMovies.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()));
    const foundMovies = checkbox ? filterMovies.filter((movie) => movie.duration <= 40) : filterMovies;
    localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
    localStorage.setItem('requestText', movieName);
    localStorage.setItem('checkbox', checkbox);
    setFoundMovies(foundMovies);
    setRequestText(movieName);
    setCheckbox(checkbox);

    if (foundMovies.length === 0) {
      setMoviesError(movieNotFoundMessage);
    } else {
      setMoviesError('');
    }
  }

  //поиск фильмов
  function handleSearchMovie(movieName, checkbox) {
    const allMovies = JSON.parse(localStorage.getItem('allMovies')) || [];

    if (allMovies.length !== 0) {
      filterMovies(movieName, checkbox);
    } else {
      setIsLoading(true)
      moviesApi.getMovies()
        .then((movies) => {
          localStorage.setItem('allMovies', JSON.stringify(movies));
          filterMovies(movieName, checkbox);
        })
        .catch((err) => {
          console.log(err);
          setMoviesError(serverErrorMessage);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
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
        console.log(`Oшибка: ${err.status} ${err.statusText}`);
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
        console.log(`Oшибка: ${err.status} ${err.statusText}`);
      })
  }

  function initialFilterMovies() {
    setFoundSavedMovies(savedMovies);
    setSavedMoviesError('');
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
            errorMessage={updateUserError}
          />

          <Route path="/signup">
            <Register
              handleRegistration={handleRegistration}
              loggedIn={loggedIn}
              errorMessage={registerError}
            />
          </Route>

          <Route path="/signin">
            <Login
              handleAuthorization={handleAuthorization}
              loggedIn={loggedIn}
              errorMessage={loginError}
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
