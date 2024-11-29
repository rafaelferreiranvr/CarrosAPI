class LoginView extends IElement {
    _loginPanel;

    constructor() {
        const element = document.createElement('div');
        super(element);
        this.createElements();
    }

    createElements() {

        this._element = new IElement(document.createElement('div'))
        .SetWidthPercent(100)
        .SetHeightPercent(100)
        .SetDisplay(Display.Flex)
        .SetJustifyContent(JustifyContent.Center)
        .SetAlignItems(AlignItems.Center)
        .SetBackgroundColor(new Color(245, 245, 245))
        .GetElement();

        this._loginPanel = new LoginPanel()
        .OnSubmit(formData => this.handleSubmit(formData));

        this._element.appendChild(this._loginPanel.GetElement());

    }

    async handleSubmit(formData) {
        this._loginPanel.GetEmailInput().ClearError();
        this._loginPanel.GetPasswordInput().ClearError();
        
        LoadingScreen.GetInstance().Show();
        
        try {
            await Account.Login(
                formData.email,
                formData.password,
                (data) => {

                    LoadingScreen.GetInstance().Hide();
                    SystemMessage.ShowMessage('Login realizado com sucesso!', SystemMessage.MessageType.Success);
                    window.app.showView('dashboard');

                },
                (error) => {
                    console.log('Login error:', error);
                    LoadingScreen.GetInstance().Hide();
                    const errorData = error.response?.data || {};
                    
                    if (errorData.error === 'userNotFound') {

                        this._loginPanel.GetEmailInput().ShowError('Usuário não encontrado');

                    } else if (errorData.error === 'invalidPassword') {

                        this._loginPanel.GetPasswordInput().ShowError('Senha incorreta');

                    } else {
                        console.error('Login error:', error);
                        this._loginPanel.GetEmailInput().ShowError('Ocorreu um erro durante o login');
                    }
                }
            );
        } catch (error) {

            console.log('Login catch error:', error);
            LoadingScreen.GetInstance().Hide();
            console.error('Login error:', error);
            SystemMessage.ShowMessage('Erro de conexão. Tente novamente.', SystemMessage.MessageType.Error);
        
        }
    }
}
