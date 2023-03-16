import React from "react";
import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__links">
                <li className="portfolio__link-container">
                    <a className="portfolio__link" href="https://sergievskaya.github.io/how-to-learn/" target="_blank" rel="noreferrer">Статичный сайт</a>
                </li>
                <li className="portfolio__link-container">
                    <a className="portfolio__link" href="https://sergievskaya.github.io/russian-travel/"  target="_blank" rel="noreferrer">Адаптивный сайт</a>
                </li>
                <li className="portfolio__link-container">
                    <a  className="portfolio__link" href="https://github.com/sergievskaya/react-mesto-api-full" target="_blank" rel="noreferrer">Одностраничное приложение</a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;