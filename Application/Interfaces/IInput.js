class IInput extends IElement {
    _input;
    _required = false;
    _requiredErrorText = 'This field is required';

    constructor(input) {
        Typing.TypeCheck(input, HTMLInputElement);
        super(input);
        this._input = input;
    }

    SetValue(value) {
        Typing.TypeCheck(value, String);
        this._input.value = value;
        return this;
    }

    GetValue() {
        return this._input.value;
    }

    SetType(type) {
        Typing.TypeCheck(type, String);
        this._input.type = type;
        return this;
    }

    SetName(name) {
        Typing.TypeCheck(name, String);
        this._input.name = name;
        return this;
    }

    GetName() {
        return this._input.name;
    }

    SetPlaceholder(text) {
        Typing.TypeCheck(text, String);
        this._input.placeholder = text;
        return this;
    }

    GetPlaceholder() {
        return this._input.placeholder;
    }

    SetDisabled(value) {
        Typing.TypeCheck(value, Boolean);
        this._input.disabled = value;
        return this;
    }

    SetReadOnly(value) {
        Typing.TypeCheck(value, Boolean);
        this._input.readOnly = value;
        return this;
    }

    GetDisabled() {
        return this._input.disabled;
    }

    GetReadOnly() {
        return this._input.readOnly;
    }

    SetPattern(pattern) {
        if (pattern) {
            Typing.TypeCheck(pattern, String);
            this._input.pattern = pattern;
        }
        return this;
    }

    GetPattern() {
        return this._input.pattern;
    }

    SetMinLength(value) {
        Typing.TypeCheck(value, Number);
        this._input.minLength = value;
        return this;
    }

    GetMinLength() {
        return this._input.minLength;
    }

    SetMaxLength(value) {
        Typing.TypeCheck(value, Number);
        this._input.maxLength = value;
        return this;
    }

    GetMaxLength() {
        return this._input.maxLength;
    }

    SetMin(value) {
        Typing.TypeCheck(value, Number);
        this._input.min = value;
        return this;
    }

    GetMin() {
        return this._input.min;
    }

    SetMax(value) {
        Typing.TypeCheck(value, Number);
        this._input.max = value;
        return this;
    }

    GetMax() {
        return this._input.max;
    }

    SetStep(value) {
        Typing.TypeCheck(value, Number);
        this._input.step = value;
        return this;
    }

    GetStep() {
        return this._input.step;
    }

    GetValidity() {
        return this._input.validity;
    }

    GetValidationMessage() {
        return this._input.validationMessage;
    }

    GetWillValidate() {
        return this._input.willValidate;
    }

    IsValid() {
        return this._input.checkValidity();
    }

    Validate() {

        if (this._required && !this.GetValue().trim()) {

            this.ShowError(this._requiredErrorText);
            return false;

        }

        return true;

    }

    Focus() {
        this._input.focus();
        return this;
    }

    Blur() {
        this._input.blur();
        return this;
    }

    Select() {
        this._input.select();
        return this;
    }

    SetSelectionRange(start, end, direction = 'none') {
        Typing.TypeCheck(start, Number);
        Typing.TypeCheck(end, Number);
        Typing.TypeCheck(direction, String);
        this._input.setSelectionRange(start, end, direction);
        return this;
    }

    GetSelectionStart() {
        return this._input.selectionStart;
    }

    GetSelectionEnd() {
        return this._input.selectionEnd;
    }

    GetSelectionDirection() {
        return this._input.selectionDirection;
    }

    GetForm() {
        return this._input.form;
    }

    Reset() {
        this.SetValue('');
        return this;
    }

    SetRequired(required) {
        Typing.TypeCheck(required, Boolean);
        this._required = required;
        return this;
    }

    IsRequired() {
        return this._required;
    }

    SetRequiredErrorText(text) {
        Typing.TypeCheck(text, String);
        this._requiredErrorText = text;
        return this;
    }

    ShowError(message) {
        Typing.TypeCheck(message, String);
        // Implementation depends on specific input field
        return this;
    }

    ClearError() {
        // Implementation depends on specific input field
        return this;
    }
}
