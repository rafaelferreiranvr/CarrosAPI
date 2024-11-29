class ImageDisplay extends IElement {
    _image;
    _placeholder;

    constructor() {
        const container = document.createElement('div');
        super(container);
        
        this.CreateElements();
        this.SetStyles();
    }

    CreateElements() {
        // Create image element
        const imgElement = document.createElement('img');
        imgElement.style.display = 'none';
        this._image = new IElement(imgElement);
        
        // Create placeholder element
        this._placeholder = new IElement(document.createElement('div'));
        this._placeholder
            .SetDisplay(Display.Flex)
            .SetJustifyContent(JustifyContent.Center)
            .SetAlignItems(AlignItems.Center)
            .SetHeightPercent(100)
            .SetWidthPercent(100)
            .SetBackgroundColor(new Color(243, 244, 246))
            .SetInnerHTML('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>');

        // Append elements
        this.AppendChild(this._image)
            .AppendChild(this._placeholder);
    }

    SetStyles() {
        // Container styles
        this.SetStyle('position', Position.Relative)
            .SetHeightPercent(100)
            .SetWidthPercent(100)
            .SetStyle('overflow', 'hidden');

        // Image styles
        const img = this._image.GetElement();
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
    }

    Render(base64Image) {
        if (base64Image) {
            const img = this._image.GetElement();
            img.src = base64Image;
            img.style.display = 'block';
            this._placeholder.SetDisplay(Display.None);
        } else {
            const img = this._image.GetElement();
            img.style.display = 'none';
            this._placeholder.SetDisplay(Display.Flex);
        }
        return this;
    }

    Clear() {
        this.Render(null);
        return this;
    }
}
