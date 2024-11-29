class InputForm extends IElement {
    _inputs = [];
    _submitButton;
    _submitCallback;

    constructor() {
        const form = document.createElement('form');
        super(form);
        
        this.SetDisplay(Display.Flex)
            .SetFlexDirection(FlexDirection.Column)
            .SetGap(8);

        this._element.addEventListener('submit', this.handleSubmit.bind(this));
    }

    AddInput(input) {
        Typing.TypeCheck(input, IInput);
        this._inputs.push(input);
        this._element.appendChild(input.GetElement());
        return this;
    }

    AddElement(element) {
        Typing.TypeCheck(element, IElement);
        this._element.appendChild(element.GetElement());
        return this;
    }

    Validate() {
        let isValid = true;
        for (const input of this._inputs) {
            if (!input.Validate()) {
                isValid = false;
            }
        }
        return isValid;
    }

    GetFormData() {
        const formData = new FormData(this._element);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        return data;
    }

    handleSubmit(event) {
        event.preventDefault();
        
        if (this.Validate()) {
            this.TriggerSubmit(this.GetFormData());
        }
    }

    OnSubmit(callback) {
        Typing.TypeCheck(callback, Function);
        this._submitCallback = callback;
        return this;
    }

    TriggerSubmit(data) {
        if (this._submitCallback) {
            this._submitCallback(data);
        }
    }

    GetInputByName(name) {
        return this._inputs.find(input => input.GetName() === name);
    }

    Reset() {
        this._inputs.forEach(input => {
            input.SetValue('');
            input.ClearError();
        });
        return this;
    }
}
