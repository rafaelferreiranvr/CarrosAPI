class SubmitPanel extends IElement {
    constructor(title) {
        const panel = document.createElement('div');
        super(panel);

        this.SetStyle('position', 'relative');
        this.SetStyles();
        this.CreateTitle(title);
        this.CreateForm();
        this.CreateLoading();
    }

    SetStyles() {
        this.SetWidthPercent(100)
            .SetMaxWidth(400)
            .SetMarginSymmetric(40, MarginValue.Auto)
            .SetPadding(30, 30, 30, 30)
            .SetBackgroundColor(new Color(255, 255, 255))
            .SetBoxShadow(0, 0, 10, 0, new Color(0, 0, 0).WithAlpha(0.1))
            .SetBorderRadius(8);
    }

    CreateTitle(titleText) {
        const title = new Title(titleText)
            .SetTextAlign(TextAlign.Center)
            .SetMargin(0, 0, 30, 0)
            .SetColor(new Color(51, 51, 51));

        this.AppendChild(title);
    }

    CreateForm() {
        this._form = new InputForm()
        .OnSubmit(data => this.TriggerSubmit(data));
        
        this.AppendChild(new IElement(this._form.GetElement()));
    }

    CreateLoading() {
        this._loading = new Loading().Hide();
        this.AppendChild(this._loading);
    }

    AddInput(input) {
        Typing.TypeCheck(input, IInput);
        this._form.AddInput(input);
        return this;
    }

    CreateSubmitButton(text, buttonCallback) {
        const button = new Button()
        .SetText(text)
        .SetWidthPercent(100)
        .SetMargin(20, 0, 0, 0)
        .SetPaddingSymmetric(12, 20)
        .SetBorderRadius(4)
        .SetCursor(Cursor.Pointer)
        .SetColors(
            new Color(33, 150, 243),  // Default blue
            new Color(30, 136, 229),  // Darker blue
            new Color(25, 118, 210)   // Even darker blue
        );

        this._form.AddElement(button);
        return this;

    }

    OnSubmit(callback) {
        
        if (callback) {

            Typing.TypeCheck(callback, Function);
            this._submitCallback = callback;
            return this;

        }
    }

    TriggerSubmit(data) {

        Typing.TypeCheck(data, Object);
        
        if (this._submitCallback) {

            this._submitCallback(data);

        }

    }

    ShowLoading() {
        this._loading.Show();
        return this;
    }

    HideLoading() {
        this._loading.Hide();
        return this;
    }

    SetSubmitCallback(callback) {
        return this.OnSubmit(callback);
    }

    GetForm() {
        return this._form;
    }

    AddLink(text, onClick) {
        const link = new Link()
            .SetText(text)
            .SetFontSize(16)
            .OnClick(onClick);

        const container = new IElement(document.createElement('div'))
            .SetTextAlign(TextAlign.Center)
            .SetMargin(20, 0, 0, 0);

        container.AppendChild(link);
        this.AppendChild(container);
        return this;
    }
}
