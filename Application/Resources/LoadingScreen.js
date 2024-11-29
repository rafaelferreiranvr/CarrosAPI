class LoadingScreen extends IElement {
    static _instance;
    _loading = false;

    constructor() {
        const element = document.createElement('div');
        super(element);

        this.SetDisplay(Display.None)
            .SetPosition(Position.Fixed)
            .SetTop(0)
            .SetLeft(0)
            .SetWidthPercent(100)
            .SetHeightPercent(100)
            .SetBackgroundColor(new Color(0, 0, 0, 0.5))
            .SetZIndex(9999)
            .SetJustifyContent(JustifyContent.Center)
            .SetAlignItems(AlignItems.Center);

        const spinner = new IElement(document.createElement('div'))
            .SetWidth(50)
            .SetHeight(50)
            .SetBorder(5, BorderStyle.Solid, new Color(243, 243, 243))
            .SetBorderTop(5, BorderStyle.Solid, new Color(52, 152, 219))
            .SetBorderRadius(50)
            .SetAnimation('spin 1s linear infinite');

        this.AppendChild(spinner);

        // Add keyframes for spinner animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    static GetInstance() {
        if (!LoadingScreen._instance) {
            LoadingScreen._instance = new LoadingScreen();
            document.body.appendChild(LoadingScreen._instance.GetElement());
        }
        return LoadingScreen._instance;
    }

    Show() {
        if (!this._loading) {
            this._loading = true;
            this.SetDisplay(Display.Flex);
        }
        return this;
    }

    Hide() {
        if (this._loading) {
            this._loading = false;
            this.SetDisplay(Display.None);
        }
        return this;
    }

    IsLoading() {
        return this._loading;
    }
}
