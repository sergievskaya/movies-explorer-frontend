import React, { useEffect, useState } from "react";
import './SearchForm.css';

function SearchForm({ handleSearchMovie, defaultValueInput, defaultValueCheckbox }) {

    const [movieName, setMovieName] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    useEffect(() => {
        setMovieName(defaultValueInput || '');
        setCheckbox(defaultValueCheckbox || false);

    }, [defaultValueInput, defaultValueCheckbox])


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
                    <input className="search__input"  placeholder="Фильм" type="text" required onChange={handleInputChange} value={movieName || ''} />
                    <button className="search__button" type="submit"></button>
                </div>
                <div className="search__checkbox-container">
                    <input className="search__checkbox" type="checkbox"  onChange={handleCheckboxChange} checked={checkbox}/>
                    <label className="search__checkbox-label">Короткометражки</label>
                </div>
            </form>

        </section>
    );
}

export default SearchForm;