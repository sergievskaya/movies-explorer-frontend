class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Oшибка: ${res.status} ${res.statusText}`);
        }
    }

    authorize(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        })
            .then(this._checkResponse);
    }

    register(data) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                name: data.name
            })
        })
            .then(this._checkResponse);
    }

    getUserInfo() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(this._checkResponse);
    }

    updateUserInfo(name, email) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email})
        })
            .then(this._checkResponse);
    }

    getSavedMovies(){
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/movies`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(this._checkResponse);
    }

    addMovie(movie) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
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
        const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/movies/${movie._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(this._checkResponse);
    }

}

const mainApi = new MainApi({
    baseUrl: 'https://api.movies.sergievskaya.nomoredomains.work'
});

export default mainApi;