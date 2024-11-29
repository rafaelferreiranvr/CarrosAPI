class Photo {

    constructor(id = null, base64 = '') {
        this.id = id;
        this.base64 = base64;
    }

}

class PhotoModel {
    
    static GetAll(onSuccess, onError) {
        try {
            new ClientRequest('/api/photo/', 'GET')
                .AddHeader('Authorization', 'Token ' + Account.GetToken())
                .OnResponse(response => {
                    const photos = Array.isArray(response) ? response.map(photoData => new Photo(
                        photoData.id,
                        photoData.Base64
                    )) : [];
                    onSuccess(photos);
                })
                .OnError(error => {
                    this.HandleServerMessages(error, 'Erro ao carregar fotos.');
                    onError(error);
                })
                .Send();
        } catch (error) {
            onError(error);
        }
    }
    
    static Get(id, onSuccess, onError) {
        try {
            new ClientRequest(`/api/photo/${id}/`, 'GET')
                .AddHeader('Authorization', 'Token ' + Account.GetToken())
                .OnResponse(data => {
                    const photo = new Photo(
                        data.id,
                        data.Base64
                    );
                    onSuccess(photo);
                })
                .OnError(error => {
                    this.HandleServerMessages(error, 'Erro ao carregar foto.');
                    onError(error);
                })
                .Send();
        } catch (error) {
            onError(error);
        }
    }

    static Post(file, onSuccess, onError) {
        try {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result;
                new ClientRequest('/api/photo/', 'POST')
                    .AddHeader('Authorization', 'Token ' + Account.GetToken())
                    .SetData({ 
                        "Base64": base64
                    })
                    .OnResponse(response => {
                        this.HandleServerMessages(null, 'Foto adicionada com sucesso!');
                        onSuccess(response);
                    })
                    .OnError(error => {
                        this.HandleServerMessages(error, 'Erro ao adicionar foto.');
                        onError(error);
                    })
                    .Send();
            };
            reader.onerror = (error) => {
                SystemMessage.ShowMessage('Erro ao ler arquivo. Verifique se é uma imagem válida.', SystemMessage.MessageType.Error);
                onError(error);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            SystemMessage.ShowMessage('Erro ao processar imagem.', SystemMessage.MessageType.Error);
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
            400: 'Dados inválidos. Verifique a imagem e tente novamente.',
            404: 'Foto não encontrada.'
        };

        const message = error ? (messages[error.status] || defaultMessage) : defaultMessage;
        const type = error ? SystemMessage.MessageType.Error : SystemMessage.MessageType.Success;
        
        SystemMessage.ShowMessage(message, type);
    }

}
