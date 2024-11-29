class Loading extends IElement {
    constructor() {
        const container = document.createElement('div');
        super(container);

        this.SetStyles();
        this.CreateSpinner();
    }

    SetStyles() {
        this.SetDisplay(Display.Flex)
            .SetJustifyContent(JustifyContent.Center)
            .SetAlignItems(AlignItems.Center)
            .SetWidthPercent(100)
            .SetHeightPercent(100)
            .SetBackgroundColor(new Color(255, 255, 255).WithAlpha(0.8))
            .SetStyle('position', 'absolute')
            .SetStyle('top', '0')
            .SetStyle('left', '0')
            .SetStyle('zIndex', '1000');
    }

    CreateSpinner() {
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        
        const style = document.createElement('style');
        style.textContent = `
            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #3498db;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(style);
        this._element.appendChild(spinner);
    }

    Show() {
        this._element.style.display = Display.Flex;
        return this;
    }

    Hide() {
        this._element.style.display = Display.None;
        return this;
    }
}
