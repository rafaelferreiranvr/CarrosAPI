class Card extends IElement {
    _contentContainer;

    constructor() {
        const element = document.createElement('div');
        super(element);
        
        this._contentContainer = new IElement(document.createElement('div'));
        
        this.AppendChild(this._contentContainer);
        
        this.SetStyles();
    }

    SetStyles() {
        // Card container styles
        this.SetStyle('position', 'relative')
            .SetDisplay(Display.Flex)
            .SetFlexDirection(FlexDirection.Row)
            .SetBackgroundColor(new Color(255, 255, 255))
            .SetBorderRadius(8)
            .SetBoxShadow(0, 2, 4, 0, new Color(0, 0, 0, 0.1))
            .SetWidth(630)
            .SetHeight(336)
            .SetStyle('box-sizing', 'border-box');

        // Content container styles
        this._contentContainer
            .SetDisplay(Display.Flex)
            .SetFlexDirection(FlexDirection.Column)
            .SetStyle('flex', '1')
            .SetPadding(56, 24, 0, 24)
            .SetStyle('box-sizing', 'border-box')
            .SetStyle('overflow', 'hidden');
    }

    SetContent(content) {
        this._contentContainer.SetInnerHTML('');
        this._contentContainer.AppendChild(content);
        return this;
    }

    SetImage(src, size = 64) {
        const img = document.createElement('img');
        img.src = src;
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;
        img.style.objectFit = 'contain';
        
        this._contentContainer.AppendChild(new IElement(img));
        return this;
    }

    OnClick(callback) {
        this._element.addEventListener('click', callback);
        return this;
    }
}
