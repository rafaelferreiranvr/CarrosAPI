class Link extends IHoverable {
    constructor() {
        const link = document.createElement('a');
        link.style.cursor = 'pointer';
        link.style.textDecoration = 'none';
        link.style.fontWeight = '500';
        link.style.fontSize = '14px';
        super(link);

        this.SetHoveringMode(HoveringMode.Element)
            .SetColors(
                new Color(0, 123, 255),
                new Color(0, 86, 179),
                new Color(0, 64, 133)
            );

        this._element.addEventListener('mouseover', () => {
            this._element.style.textDecoration = 'underline';
        });

        this._element.addEventListener('mouseout', () => {
            this._element.style.textDecoration = 'none';
        });
    }

    SetText(text) {
        Typing.TypeCheck(text, String);
        this._element.textContent = text;
        return this;
    }

    OnClick(callback) {
        Typing.TypeCheck(callback, Function);
        this._element.onclick = (e) => {
            e.preventDefault();
            callback();
        };
        return this;
    }

    SetHref(href) {
        Typing.TypeCheck(href, String);
        this._element.href = href;
        return this;
    }
}
