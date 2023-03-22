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
        //получить данные пользователя get
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(this._checkResponse);
    }

}

const mainApi = new MainApi({
    baseUrl: 'https://api.movies.sergievskaya.nomoredomains.work',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default mainApi;