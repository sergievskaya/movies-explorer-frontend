import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css';

function Navigation({ pathname }) {
  
    return(
        <>
            {pathname === '/' ? (
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
                <> </>
            )}
        </>
    );
}

export default Navigation;