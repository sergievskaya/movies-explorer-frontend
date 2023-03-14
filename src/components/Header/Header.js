import React from "react";
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from "../Navigation/Navigation";
import { Link, useLocation } from "react-router-dom";

function Header() {
    const { pathname } = useLocation();

    const headerClassName = `header ${pathname === '/' ? 'header_promo' : ''}`;

    return (
        <header className={headerClassName}>
            <Link to="/" className="header__logo-link">
                <img src={logo} alt="логотип Movies Explorer" className="header__logo" />
            </Link>
            <Navigation pathname={pathname} />
        </header>
    );
}

export default Header;