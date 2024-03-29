import React from 'react';
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

function App() {

  const { pathname } = useLocation();

  return (
    <div className="App">
      {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ? <Header /> : <></>}

      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route path="/movies">
          <Movies />
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
