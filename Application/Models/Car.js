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
                .OnError(onError)
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
                        data.name,
                        data.status,
                        data.photoId
                    );
                    onSuccess(car);
                })
                .OnError(onError)
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
                .OnResponse(onSuccess)
                .OnError((error) => {
                    console.log('Car POST error:', error);
                    onError(error);
                })
                .Send();

        } catch (error) {
            console.log('Car POST catch error:', error);
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
                .AddHeader('Authorization', 'Token ' + Account.GetToken())
                .SetData(data)
                .OnResponse(onSuccess)
                .OnError((error) => {
                    console.log('Car PUT error:', error);
                    onError(error);
                })
                .Send();

        } catch (error) {
            console.log('Car PUT catch error:', error);
            onError(error);
        }
    }

    static Delete(id, onSuccess, onError) {
        try {
            new ClientRequest(`/api/car/${id}/`, 'DELETE')
                .AddHeader('Authorization', 'Token ' + Account.GetToken())
                .OnResponse(onSuccess)
                .OnError(onError)
                .Send();
        } catch (error) {
            onError(error);
        }
    }
}