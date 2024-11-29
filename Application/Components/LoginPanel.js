class LoginPanel extends SubmitPanel {
    _emailInput;
    _passwordInput;
    _loading = false;

    constructor() {
        super('Login');
        this.CreateInputs();

        this.CreateSubmitButton('Entrar', button => {
            button.SetColors(
                new Color(33, 150, 243),  // Blue
                new Color(30, 136, 229),  // Darker blue
                new Color(25, 118, 210)   // Even darker blue
            );
        });

        this.AddLink('Não tem uma conta? Cadastre-se', () => {
            this.ClearErrors();
            window.app.showView('signup');
        });
    }

    CreateInputs() {
        this._emailInput = new InputField()
            .SetType('email')
            .SetName('email')
            .SetPlaceholder('Email')
            .SetRequired(true)
            .SetRequiredErrorText('Por favor, digite seu email');

        this._passwordInput = new InputField()
            .SetType('password')
            .SetName('password')
            .SetPlaceholder('Senha')
            .SetRequired(true)
            .SetRequiredErrorText('Por favor, digite sua senha');

        this.AddInput(this._emailInput)
            .AddInput(this._passwordInput);

        return this;
    }

    ClearErrors() {
        this._emailInput.ClearError();
        this._passwordInput.ClearError();
    }

    GetEmailInput() {
        return this._emailInput;
    }

    GetPasswordInput() {
        return this._passwordInput;
    }

}
