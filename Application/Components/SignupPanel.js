class SignupPanel extends SubmitPanel {
    _nameInput;
    _emailInput;
    _passwordInput;
    _loading = false;

    constructor() {
        super('Criar Conta');
        this.CreateInputs();

        this.CreateSubmitButton('Cadastrar', button => {
            button.SetColors(
                new Color(0, 128, 0),  // Green
                new Color(0, 100, 0),  // Darker green
                new Color(0, 50, 0)    // Even darker green
            );
        });

        this.OnSubmit(data => this.TriggerSubmit(data));

        this.AddLink('Já tem uma conta? Faça login', () => {
            this.ClearErrors();
            window.app.showView('login');
        });
    }

    CreateInputs() {
        this._nameInput = new InputField()
            .SetType('text')
            .SetName('username')
            .SetPlaceholder('Nome')
            .SetRequired(true)
            .SetMinLength(3)
            .SetRequiredErrorText('Por favor, digite seu nome');

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
            .SetMinLength(6)
            .SetRequiredErrorText('Por favor, digite sua senha');

        this.AddInput(this._nameInput)
            .AddInput(this._emailInput)
            .AddInput(this._passwordInput);

        return this;
    }

    ClearErrors() {
        this._nameInput.ClearError();
        this._emailInput.ClearError();
        this._passwordInput.ClearError();
    }

    GetNameInput() {
        return this._nameInput;
    }

    GetEmailInput() {
        return this._emailInput;
    }

    GetPasswordInput() {
        return this._passwordInput;
    }

}
