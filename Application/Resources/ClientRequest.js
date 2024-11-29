class ClientRequest {
    _onResponseCallback;
    _onErrorCallback;
    _url;
    _method;
    _data;
    _headers = {
        'Content-Type': 'application/json'
    };

    constructor(url, method) {
        this._url = url;
        this._method = method;
    }

    OnResponse(callback) {
        Typing.TypeCheck(callback, Function);
        this._onResponseCallback = callback;
        return this;
    }

    OnError(callback) {
        Typing.TypeCheck(callback, Function);
        this._onErrorCallback = callback;
        return this;
    }

    SetUrl(url) {
        Typing.TypeCheck(url, String);
        this._url = url;
        return this;
    }

    SetData(data) {
        this._data = data;
        return this;
    }

    SetHeaders(headers) {
        Typing.TypeCheck(headers, Object);
        this._headers = { ...this._headers, ...headers };
        return this;
    }

    AddHeader(key, value) {
        Typing.TypeCheck(key, String);
        Typing.TypeCheck(value, String);
        this._headers[key] = value;
        return this;
    }

    TriggerResponse(responseData) {
        if (this._onResponseCallback) {
            this._onResponseCallback(responseData);
        }
    }

    TriggerError(error) {
        if (this._onErrorCallback) {
            this._onErrorCallback(error);
        }
    }

    async Send() {
        try {
            const options = {
                method: this._method,
                headers: this._headers
            };

            if (this._data) {
                options.body = JSON.stringify(this._data);
            }

            const response = await fetch(this._url, options);
            
            if (!response.ok) {
                const error = new Error('Request failed');
                error.status = response.status;
                
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const responseData = await response.json();
                    error.response = { 
                        data: responseData,
                        status: response.status 
                    };
                } else {
                    error.response = { 
                        data: { message: 'Request failed' },
                        status: response.status
                    };
                }
                throw error;
            }
            
            const contentType = response.headers.get("content-type");
            let responseData = null;
            
            if (contentType && contentType.includes("application/json") && response.status !== 204) {
                responseData = await response.json();
            }
            
            this.TriggerResponse(responseData);
            return this;

        } catch (error) {
            if (!error.response) {
                error.response = { 
                    data: { message: error.message },
                    status: error.status || 500
                };
            }
            this.TriggerError(error);
            return this;
        }
    }
}
