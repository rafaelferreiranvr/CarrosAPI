class SignupView extends IElement {
    _signupPanel;

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

        this._signupPanel = new SignupPanel()
        .OnSubmit(formData => this.handleSubmit(formData));

        this._element.appendChild(this._signupPanel.GetElement());

    }

    async handleSubmit(formData) {

        this._signupPanel.GetNameInput().ClearError();
        this._signupPanel.GetEmailInput().ClearError();
        this._signupPanel.GetPasswordInput().ClearError();

        LoadingScreen.GetInstance().Show();

        try {
            await Account.Signup(
                formData.username,
                formData.email,
                formData.password,
                (data) => {

                    LoadingScreen.GetInstance().Hide();
                    SystemMessage.ShowMessage('Cadastro realizado com sucesso!', SystemMessage.MessageType.Success);
                    window.app.showView('dashboard');

                },
                (error) => {

                    console.log('Signup error:', error);
                    LoadingScreen.GetInstance().Hide();

                    const errorData = error.response?.data || {};

                    if (errorData.error === 'usernameExists') {

                        this._signupPanel.GetNameInput().ShowError('Este nome de usuário já está em uso');
                    
                    } else if (errorData.error === 'userEmailExists') {

                        this._signupPanel.GetEmailInput().ShowError('Este email já está em uso');
                    
                    } else {
                        console.error('Signup error details:', error);
                        this._signupPanel.GetEmailInput().ShowError('Ocorreu um erro durante o cadastro');
                    
                    }

                }
            );
        } catch (error) {
            console.log('Signup catch error:', error);
            LoadingScreen.GetInstance().Hide();
            console.error('Signup error:', error);
            SystemMessage.ShowMessage('Erro de conexão.', SystemMessage.MessageType.Error);
        }
    }

}
