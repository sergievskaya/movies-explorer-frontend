import React from "react";
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__copyright">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__date">&copy; 2023</p>
                <nav className="footer__nav">
                    <ul className="footer__nav-list">
                        <li className="footer__nav-item">
                            <a className="footer__link" href="https://practicum.yandex.ru"  target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                        </li>
                        <li className="footer__nav-item">
                            <a className="footer__link" href="https://github.com/sergievskaya"  target="_blank" rel="noreferrer">Github</a>
                        </li>
                    </ul>
                </nav>
            </div>

        </footer>
    );
}

export default Footer;