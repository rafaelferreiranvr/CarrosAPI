class Account {
    static _userId = null;
    static _username = '';
    static _email = '';
    static _token = '';

    static Initialize() {
        this._token = localStorage.getItem('token') || '';
        this._userId = localStorage.getItem('userId') || null;
        this._username = localStorage.getItem('username') || '';
        this._email = localStorage.getItem('email') || '';
    }
    
    static async Login(email, password, onSuccess, onError) {
        Typing.TypeCheck(email, String);
        Typing.TypeCheck(password, String);
        Typing.TypeCheck(onSuccess, Function);
        Typing.TypeCheck(onError, Function);

        try {
            const response = await new ClientRequest('/auth/login/', 'POST')
                .SetData({ email, password })
                .OnResponse(data => {
                    this.Set(data.id, data.username, data.email, data.token);
                    onSuccess(data);
                })
                .OnError(onError)
                .Send();

        } catch (error) {
            onError(error);
        }
    }

    static async Logout(onSuccess, onError) {
        Typing.TypeCheck(onSuccess, Function);
        Typing.TypeCheck(onError, Function);

        try {
            const response = await new ClientRequest('/auth/logout/', 'POST')
                .AddHeader('Authorization', 'Token ' + this.GetToken())
                .OnResponse(() => {
                    this.Clear();
                    onSuccess();
                })
                .OnError(() => { 
                    this.Clear(); 
                    onError();})
                .Send();

        } catch (error) {
            onError(error);
        }

    }

    static async Signup(name, email, password, onSuccess, onError) {
        Typing.TypeCheck(name, String);
        Typing.TypeCheck(email, String);
        Typing.TypeCheck(password, String);
        Typing.TypeCheck(onSuccess, Function);
        Typing.TypeCheck(onError, Function);

        try {
            const response = await new ClientRequest('/auth/signup/', 'POST')
                .SetData({ username: name, email, password })
                .OnResponse(data => {
                    this.Set(data.id, data.username, data.email, data.token);
                    onSuccess(data);
                })
                .OnError(onError)
                .Send();

        } catch (error) {
            onError(error);
        }
    }

    static Clear() {
        this._userId = null;
        this._username = '';
        this._email = '';
        this._token = '';
        
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
    }

    static Set(userId, username, email, token) {
        Typing.TypeCheck(userId, [Number, null]);
        Typing.TypeCheck(username, String);
        Typing.TypeCheck(email, String);
        Typing.TypeCheck(token, String);

        this._userId = userId;
        this._username = username;
        this._email = email;
        this._token = token;

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
    }

    static GetUserId() {
        return this._userId;
    }

    static GetUsername() {
        return this._username;
    }

    static GetEmail() {
        return this._email;
    }

    static GetToken() {
        return this._token;
    }

    static IsAuthenticated() {
        return Boolean(this._token);
    }
}
