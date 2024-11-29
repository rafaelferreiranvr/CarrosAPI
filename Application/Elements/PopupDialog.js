const PopupDialog = class extends IElement {
    _overlay;
    _dialog;
    _title;
    _message;
    _confirmButton;
    _cancelButton;
    _onConfirm;
    _onCancel;

    constructor(title, message, onConfirm, onCancel = null) {
        const element = document.createElement('div');
        super(element);

        this._onConfirm = onConfirm;
        this._onCancel = onCancel;

        this.CreateElements(title, message);
        this.SetStyles();
        this.Show();
    }

    CreateElements(title, message) {
        // Create overlay
        this._overlay = new IElement(document.createElement('div'));
        this._overlay
            .SetStyle('position', Position.Fixed)
            .SetStyle('top', '0')
            .SetStyle('left', '0')
            .SetStyle('right', '0')
            .SetStyle('bottom', '0')
            .SetBackgroundColor(new Color(0, 0, 0, 0.5))
            .SetDisplay(Display.Flex)
            .SetJustifyContent(JustifyContent.Center)
            .SetAlignItems(AlignItems.Center)
            .SetStyle('zIndex', ZIndex.Modal);

        // Create dialog
        this._dialog = new IElement(document.createElement('div'));
        this._dialog
            .SetBackgroundColor(new Color(255, 255, 255))
            .SetStyle('borderRadius', BorderRadius.Medium)
            .SetStyle('padding', Padding.Large)
            .SetStyle('width', Width.Custom(400))
            .SetStyle('boxShadow', '0 4px 6px rgba(0, 0, 0, 0.1)');

        // Create title
        this._title = new IElement(document.createElement('h2'));
        this._title
            .SetStyle('fontSize', '20px')
            .SetStyle('marginBottom', '16px')
            .SetStyle('fontWeight', '600')
            .SetInnerHTML(title);

        // Create message
        this._message = new IElement(document.createElement('p'));
        this._message
            .SetStyle('marginBottom', '24px')
            .SetColor(new Color(75, 85, 99))
            .SetInnerHTML(message);

        // Create buttons container
        const buttonsContainer = new IElement(document.createElement('div'));
        buttonsContainer
            .SetDisplay(Display.Flex)
            .SetJustifyContent(JustifyContent.End)
            .SetStyle('gap', '12px');

        // Create confirm button
        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirmar';
        this._confirmButton = new Button(confirmButton);
        this._confirmButton
            .SetColors(
                new Color(244, 67, 54),  // Default red
                new Color(239, 83, 80),  // Lighter red for hover
                new Color(211, 47, 47)   // Darker red for active
            )
            .SetColor(new Color(255, 255, 255))
            .SetStyle('padding', Padding.Small)
            .SetStyle('borderRadius', BorderRadius.Small)
            .AddEventListener('click', () => this.HandleConfirm());

        // Create cancel button
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancelar';
        this._cancelButton = new Button(cancelButton);
        this._cancelButton
            .SetColors(
                new Color(229, 231, 235),  // Default gray
                new Color(209, 213, 219),  // Darker gray for hover
                new Color(156, 163, 175)   // Even darker gray for active
            )
            .SetColor(new Color(75, 85, 99))
            .SetStyle('padding', Padding.Small)
            .SetStyle('borderRadius', BorderRadius.Small)
            .AddEventListener('click', () => this.HandleCancel());

        // Assemble the dialog
        buttonsContainer
            .AppendChild(this._cancelButton)
            .AppendChild(this._confirmButton);

        this._dialog
            .AppendChild(this._title)
            .AppendChild(this._message)
            .AppendChild(buttonsContainer);

        this._overlay.AppendChild(this._dialog);
        this.AppendChild(this._overlay);
    }

    SetStyles() {
        // Add any additional styles here
    }

    Show() {
        document.body.appendChild(this.GetElement());
    }

    Close() {
        document.body.removeChild(this.GetElement());
    }

    HandleConfirm() {
        if (this._onConfirm) {
            this._onConfirm();
        }
        this.Close();
    }

    HandleCancel() {
        if (this._onCancel) {
            this._onCancel();
        }
        this.Close();
    }
}
