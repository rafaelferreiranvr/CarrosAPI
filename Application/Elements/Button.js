class Button extends IHoverable {
    constructor(textOrElement) {
        let button;
        if (textOrElement instanceof HTMLElement) {
            button = textOrElement;
        } else {
            button = document.createElement('button');
            button.textContent = textOrElement;
        }
        button.className = 'button';
        
        super(button);

        // Apply styles without colors
        this.SetHoveringMode(HoveringMode.Background)
            .SetPaddingSymmetric(10, 20)
            .SetBorder(0, BorderStyle.None, new Color(0, 0, 0, 0))
            .SetBorderRadius(4)
            .SetCursor(Cursor.Pointer)
            .SetFontSize(16);

        // Set default colors only if no background color is set
        if (!this.GetElement().style.backgroundColor) {
            this.SetColors(
                new Color(0, 123, 255),  // Default blue
                new Color(0, 105, 217),  // Darker blue on hover
                new Color(0, 90, 189)    // Even darker blue when active
            );
            this.SetTextColor(new Color(255, 255, 255));
        }

        return this;
    }

    SetText(text) {
        this._element.textContent = text;
        return this;
    }

    OnClick(callback) {
        Typing.TypeCheck(callback, Function);
        this._element.onclick = callback;
        return this;
    }

    Disable() {
        this._element.disabled = true;
        this.SetStyle('opacity', '0.6')
            .SetCursor('not-allowed');
        return this;
    }

    Enable() {
        this._element.disabled = false;
        this.SetStyle('opacity', '1')
            .SetCursor('pointer');
        return this;
    }
}
