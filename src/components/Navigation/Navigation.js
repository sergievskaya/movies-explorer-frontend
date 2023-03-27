import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navigation.css'

function Navigation({ loggedIn }) {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false)

  function handlePopupOpen() {
    setIsPopupOpen(true)
  }

  function handlePopupClose() {
    setIsPopupOpen(false)
  }

  return (
    <>
      {!loggedIn ? (
        <nav className="navigation">
          <ul className="navigation__list">
            <li className="navigation__list-item">
              <Link to="/signup" className="navigation__link">Регистрация</Link>
            </li>
            <li className="navigation__list-item">
              <Link to="/signin" className="navigation__link navigation__link_type_signin">Войти</Link>
            </li>
          </ul>
        </nav>
      ) : (
        <div className="navigation navigation_loggedin">
          <div className={`navigation__overlay ${isPopupOpen ? "navigation__overlay_visible" : ""}`}>
            <nav className="navigation__menu">
              <div className="navigation__links-container">
                <button className='navigation__close-menu' onClick={handlePopupClose} type="button"></button>
                <NavLink to="/" exact className="navigation__menu-link navigation__menu-link_type_main" activeClassName="navigation__menu-link_active">Главная</NavLink>
                <NavLink to="/movies" className="navigation__menu-link" activeClassName="navigation__menu-link_active">Фильмы</NavLink>
                <NavLink to="/saved-movies" className="navigation__menu-link" activeClassName="navigation__menu-link_active">Сохранённые фильмы</NavLink>
              </div>
              <Link to="/profile" className="navigation__menu-link navigation__menu-link_type_profile">
                <div className='navigation__account-icon'></div>
                Аккаунт
              </Link>
            </nav>
          </div>
          <button className='navigation__open-menu' onClick={handlePopupOpen} type="button"></button>
        </div>
      )}
    </>
  )
}

export default Navigation