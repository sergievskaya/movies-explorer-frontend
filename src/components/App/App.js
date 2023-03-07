import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Route, Switch } from 'react-router-dom';
import Movies from '../Movies/Movies';

function App() {
  return (
    <div className="page">
      <Header />

      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route path="/movies">
          <Movies />
        </Route>
      </Switch>
      
      <Footer />
    </div>
  );
}

export default App;
