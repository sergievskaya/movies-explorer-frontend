import React, { useState } from "react";
import './SearchForm.css';

function SearchForm({ handleSearchMovie }) {

    const [movieName, setMovieName] = useState('');
    const [checkbox, setCheckbox] = useState(false);


    function handleInputChange(evt) {
        setMovieName(evt.target.value);
    }

    function handleCheckboxChange(evt) {
        const isCheckboxActive = evt.target.checked;
        setCheckbox(isCheckboxActive);
        handleSearchMovie(movieName, isCheckboxActive);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        handleSearchMovie(movieName, checkbox);
    }


    return (
        <section className="search">
            <form className="search__form" onSubmit={handleSubmit}>
                <div className="search__container">
                    <input className="search__input"  placeholder="Фильм" type="text" required onChange={handleInputChange} />
                    <button className="search__button" type="submit"></button>
                </div>
                <div className="search__checkbox-container">
                    <input className="search__checkbox" type="checkbox"  onChange={handleCheckboxChange}/>
                    <label className="search__checkbox-label">Короткометражки</label>
                </div>
            </form>

        </section>
    );
}

export default SearchForm;