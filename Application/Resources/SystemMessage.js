class SystemMessage extends IElement {
    static _instance = null;
    static MessageType = {
        Success: 'success',
        Error: 'error'
    };

    constructor() {
        if (SystemMessage._instance) {
            return SystemMessage._instance;
        }

        const container = document.createElement('div');
        super(container);
        
        this._messageElement = new IElement(document.createElement('div'));
        this.AppendChild(this._messageElement);
        
        this.SetStyles();
        this.Hide();
        
        document.body.appendChild(this._element);
        SystemMessage._instance = this;
    }

    SetStyles() {
        // Container styles
        this.SetStyle('position', 'fixed')
            .SetStyle('top', '40px')
            .SetStyle('left', '50%')
            .SetStyle('transform', 'translateX(-50%)')
            .SetStyle('zIndex', '2000')
            .SetStyle('minWidth', '300px')
            .SetStyle('maxWidth', '80%')
            .SetStyle('transition', 'opacity 0.3s ease-out')
            .SetPaddingSymmetric(16, 24)
            .SetBorderRadius(8)
            .SetBoxShadow(0, 4, 12, 0, new Color(0, 0, 0).WithAlpha(0.1));

        // Message styles
        this._messageElement
            .SetFontSize(16)
            .SetLineHeight(1.5)
            .SetTextAlign(TextAlign.Center);
    }

    SetMessageType(type) {
        switch (type) {
            case SystemMessage.MessageType.Success:
                this.SetBackgroundColor(new Color(76, 175, 80));  // Green
                this._messageElement.SetColor(new Color(255, 255, 255));
                break;
            case SystemMessage.MessageType.Error:
                this.SetBackgroundColor(new Color(244, 67, 54));  // Red
                this._messageElement.SetColor(new Color(255, 255, 255));
                break;
            default:
                throw new Error(`Invalid message type: ${type}`);
        }
        return this;
    }

    Show(message, type, duration = 3000) {
        this.SetMessageType(type);
        this._messageElement.SetTextContent(message);
        
        // Reset opacity and display
        this.SetStyle('opacity', '1')
            .SetDisplay(Display.Block);

        // Start fade out animation before hiding
        setTimeout(() => {
            this.SetStyle('opacity', '0');
            setTimeout(() => {
                this.Hide();
            }, 300); // Match transition duration
        }, duration - 300); // Start fade out before duration ends

        return this;
    }

    Hide() {
        this.SetDisplay(Display.None);
        return this;
    }

    static ShowMessage(message, type = SystemMessage.MessageType.Success, duration = 3000) {
        const instance = new SystemMessage();
        instance.Show(message, type, duration);
    }
}
