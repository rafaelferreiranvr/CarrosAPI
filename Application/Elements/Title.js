class Title extends IElement {
    constructor(text) {
        const element = document.createElement('h2');
        super(element);
        this.setDefaultStyles();
        if (text) {
            this.SetTextContent(text);
        }
    }

    setDefaultStyles() {
        this.SetMargin(0, 0, 0, 0)
            .SetFontSize(24)
            .SetColor(new Color(51, 51, 51));
    }
}
