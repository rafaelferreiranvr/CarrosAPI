class Car {

    constructor(id = null, name = '', status = StatusCar.Available, photoId = null, base64 = null) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.photoId = photoId;
        this.base64 = base64;
    }

    Photo(onSuccess, onError) {

        if (!this.photoId) {
            onSuccess(null);
            return;
        }

        PhotoModel.Get(this.photoId, onSuccess, onError);

    }

}

class CarModel {

    static GetAll(onSuccess, onError) {
        try {
            new ClientRequest('/api/car/', 'GET')
                .AddHeader('Authorization', 'Token ' + Account.GetToken())
                .OnResponse(response => {
                    const carsData = response;
                    const cars = Array.isArray(carsData) ? carsData.map(carData => new Car(
                        carData.id,
                        carData.Name,
                        carData.Status,
                        carData.Photo,
                        carData.Base64
                    )) : [];
                    onSuccess(cars);
                })
                .OnError(error => {
                    this.HandleServerMessages(error, 'Erro ao carregar carros.');
                    onError(error);
                })
                .Send();
        } catch (error) {
            onError(error);
        }
    }

    static Get(id, onSuccess, onError) {
        try {
            new ClientRequest(`/api/car/${id}/`, 'GET')
                .AddHeader('Authorization', 'Token ' + Account.GetToken())
                .OnResponse(data => {
                    const car = new Car(
                        data.id,
                        data.Name,
                        data.Status,
                        data.Photo,
                        data.Base64
                    );
                    onSuccess(car);
                })
                .OnError(error => {
                    this.HandleServerMessages(error, 'Erro ao carregar carro.');
                    onError(error);
                })
                .Send();
        } catch (error) {
            onError(error);
        }
    }

    static Post(name, status, base64, onSuccess, onError) {
        try {
            let data = {
                "Name": name, 
                "Status": status, 
            };
            
            if (base64) {
                data["Base64"] = base64
            }

            new ClientRequest('/api/car/', 'POST')
                .SetData(data)
                .AddHeader('Authorization', 'Token ' + Account.GetToken())
                .OnResponse(response => {
                    this.HandleServerMessages(null, 'Carro adicionado com sucesso!');
                    onSuccess(response);
                })
                .OnError(error => {
                    this.HandleServerMessages(error, 'Erro ao adicionar carro.');
                    onError(error);
                })
                .Send();
        } catch (error) {
            onError(error);
        }
    }

    static Put(id, name, status, base64, onSuccess, onError) {
        try {
            const data = {
                "Name": name, 
                "Status": status
            };

            if (base64) {
                data["Base64"] = base64;
            }

            new ClientRequest(`/api/car/${id}/`, 'PUT')
                .SetData(data)
                .AddHeader('Authorization', 'Token ' + Account.GetToken())
                .OnResponse(response => {
                    this.HandleServerMessages(null, 'Carro atualizado com sucesso!');
                    onSuccess(response);
                })
                .OnError(error => {
                    this.HandleServerMessages(error, 'Erro ao atualizar carro.');
                    onError(error);
                })
                .Send();
        } catch (error) {
            onError(error);
        }
    }

    static Delete(id, onSuccess, onError) {
        try {
            new ClientRequest(`/api/car/${id}/`, 'DELETE')
                .AddHeader('Authorization', 'Token ' + Account.GetToken())
                .OnResponse(() => {
                    this.HandleServerMessages(null, 'Carro excluído com sucesso!');
                    onSuccess();
                })
                .OnError(error => {
                    this.HandleServerMessages(error, 'Erro ao excluir carro.');
                    onError(error);
                })
                .Send();
        } catch (error) {
            onError(error);
        }
    }

    static HandleServerMessages(error, defaultMessage) {
        if (error?.status === 401) {

            SystemMessage.ShowMessage('Sessão expirada. Por favor, faça login novamente.', SystemMessage.MessageType.Error);
            Account.Clear();
            window.app.showView('login');

            return;
        }

        const messages = {
            400: 'Dados inválidos. Verifique os campos e tente novamente.',
            404: 'Carro não encontrado.',
            405: 'Operação não permitida.'
        };

        // Only show error message if we're not on login view
        const currentView = window.app.getCurrentView();
        if (!(currentView instanceof LoginView)) {
            const message = error ? (messages[error.status] || defaultMessage) : defaultMessage;
            const type = error ? SystemMessage.MessageType.Error : SystemMessage.MessageType.Success;
            SystemMessage.ShowMessage(message, type);
        }
    }

}