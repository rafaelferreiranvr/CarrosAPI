class Photo {

    constructor(id = null, base64 = '') {
        this.id = id;
        this.base64 = base64;
    }

}

class PhotoModel {
    
    static Get(id, onSuccess, onError) {
        try {
            new ClientRequest(`/api/photos/${id}/`, 'GET')
                .AddHeader('Authorization', 'Token ' + Account.GetToken())
                .OnResponse(data => {
                    const photo = new Photo(
                        data.id,
                        data.base64
                    );
                    onSuccess(photo);
                })
                .OnError(onError)
                .Send();
        } catch (error) {
            onError(error);
        }
    }

    static Post(file, onSuccess, onError) {
        try {
            const reader = new FileReader();
            reader.onload = function() {
                const base64 = reader.result;
                new ClientRequest('/api/photos/', 'POST')
                    .AddHeader('Authorization', 'Token ' + Account.GetToken())
                    .SetData({ 
                        "Base64": base64
                    })
                    .OnResponse(onSuccess)
                    .OnError((error) => {
                        console.log('Photo POST error:', error);
                        onError(error);
                    })
                    .Send();
            };
            reader.onerror = function() {
                console.log('FileReader error:', reader.error);
                onError(reader.error);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.log('Photo POST catch error:', error);
            onError(error);
        }
    }
}
