class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Oшибка: ${res.status}`);
        }
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    updateUserInfo(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                email
            })
        })
            .then(this._checkResponse);
    }

    getSavedMovies(){
        return fetch(`${this._baseUrl}/movies`, {
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    addMovie(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN
            })
        })
            .then(this._checkResponse);
    }

    deleteMovie(movie) {
        return fetch(`${this._baseUrl}/movies/${movie._id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

}

const mainApi = new MainApi({
    baseUrl: 'https://api.movies.sergievskaya.nomoredomains.work',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDFiMjU4OTlmNjcxYzhjMzcwOTdjNTMiLCJpYXQiOjE2Nzk1MDA3MTQsImV4cCI6MTY4MDEwNTUxNH0.6MtRM1M33tiJj-4hiUZ34CYWflMw-obgP8phs75z_GY',
    }
});

export default mainApi;