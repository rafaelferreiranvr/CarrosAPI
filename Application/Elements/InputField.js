class InputField extends IInput {
    _container;
    _label;
    _input;
    _errorMessage;
    _clearErrorTimeout;

    static Colors = {
        Error: new Color(220, 53, 69),     
        Primary: new Color(0, 123, 255),    
        Border: new Color(221, 221, 221),  
        Label: new Color(51, 51, 51),       
        Background: new Color(255, 255, 255) 
    };

    constructor(id = '') {
        Typing.TypeCheck(id, String);
        const input = document.createElement('input');
        super(input);
        this._input = input;

        this._container = document.createElement('div');
        if (id) this._container.id = id;
        this._container.className = 'input-field';
        
        this._label = document.createElement('label');
        
        this._errorMessage = document.createElement('span');
        this._errorMessage.className = 'error-message';
        Object.assign(this._errorMessage.style, {
            opacity: '0',
            fontSize: '12px',
            color: InputField.Colors.Error.toString(),
            marginTop: '2px',
            transition: 'opacity 0.3s ease',
            display: 'block',
            minHeight: '16px'
        });

        this._container.appendChild(this._label);
        this._container.appendChild(this._input);
        this._container.appendChild(this._errorMessage);

        this.SetDefaultStyles();
    }

    GetElement() {
        return this._container;
    }

    GetInput() {
        return this._input;
    }

    SetDefaultStyles() {
        Object.assign(this._container.style, {
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            margin: '4px 0'
        });

        // Create a wrapper for the input to handle the glow effect
        const inputWrapper = document.createElement('div');
        Object.assign(inputWrapper.style, {
            position: 'relative',
            width: '100%'
        });

        // Add a pseudo-element for the glow
        const glow = document.createElement('div');
        Object.assign(glow.style, {
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            borderRadius: '6px',
            transition: 'opacity 0.2s ease',
            opacity: '0',
            border: `2px solid ${InputField.Colors.Error.WithAlpha(0.25).toString()}`,
            pointerEvents: 'none'
        });

        Object.assign(this._input.style, {
            padding: '6px 10px',
            border: `1px solid ${InputField.Colors.Border.toString()}`,
            borderRadius: '4px',
            fontSize: '14px',
            lineHeight: '1.5',
            width: '100%',
            boxSizing: 'border-box',
            transition: 'all 0.2s ease',
            backgroundColor: InputField.Colors.Background.toString(),
            position: 'relative'
        });

        // Wrap input with the glow effect
        this._input.parentNode.insertBefore(inputWrapper, this._input);
        inputWrapper.appendChild(glow);
        inputWrapper.appendChild(this._input);

        Object.assign(this._label.style, {
            fontSize: '14px',
            color: InputField.Colors.Label.toString(),
            fontWeight: '500',
            transition: 'color 0.2s ease'
        });

        // Add focus styles
        this._input.addEventListener('focus', () => {
            if (!this._container.classList.contains('invalid')) {
                this._input.style.borderColor = InputField.Colors.Primary.toString();
                glow.style.border = `2px solid ${InputField.Colors.Primary.WithAlpha(0.25).toString()}`;
                glow.style.opacity = '1';
            }
        });

        this._input.addEventListener('blur', () => {
            if (!this._container.classList.contains('invalid')) {
                this._input.style.borderColor = InputField.Colors.Border.toString();
                glow.style.opacity = '0';
            }
        });

        return this;
    }

    SetLabel(text) {
        Typing.TypeCheck(text, String);
        this._label.textContent = text;
        return this;
    }

    ShowError(message) {
        Typing.TypeCheck(message, String);
        
        // Reset any ongoing clear timeout
        if (this._clearErrorTimeout) {
            clearTimeout(this._clearErrorTimeout);
            this._clearErrorTimeout = null;
        }
        
        // Show error immediately
        this._errorMessage.textContent = message;
        this._errorMessage.style.opacity = '1';
        
        // Add error styles
        this._container.classList.add('invalid');
        this._input.style.borderColor = InputField.Colors.Error.toString();
        const glow = this._input.parentNode.firstChild;
        glow.style.border = `2px solid ${InputField.Colors.Error.WithAlpha(0.25).toString()}`;
        glow.style.opacity = '1';
        this._label.style.color = InputField.Colors.Error.toString();
        
        return this;
    }

    ClearError() {
        // Start fade out
        this._errorMessage.style.opacity = '0';
        
        // Reset styles immediately
        this._container.classList.remove('invalid');
        this._input.style.borderColor = InputField.Colors.Border.toString();
        const glow = this._input.parentNode.firstChild;
        glow.style.opacity = '0';
        this._label.style.color = InputField.Colors.Label.toString();
        
        return this;
    }
}
