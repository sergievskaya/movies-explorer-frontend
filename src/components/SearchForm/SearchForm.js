import React from "react";
import './SearchForm.css';

function SearchForm() {
    return (
        <section className="search">
            <form className="search__form">
                <div className="search__container">
                    <input className="search__input"  placeholder="Фильм" type="text" required />
                    <button className="search__button" type="submit"></button>
                </div>
                <div className="search__checkbox-container">
                    <input className="search__checkbox" type="checkbox" />
                    <label className="search__checkbox-label">Короткометражки</label>
                </div>
            </form>

        </section>
    );
}

export default SearchForm;