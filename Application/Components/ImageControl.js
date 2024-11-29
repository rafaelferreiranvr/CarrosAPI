class ImageControl extends IElement {
    _imageDisplay;
    _imageUpload;
    _removePhotoButton;
    _onImageChange;
    _onImageRemove;
    _editMode = false;

    constructor(onImageChange, onImageRemove) {
        super(document.createElement('div'));
        this._onImageChange = onImageChange;
        this._onImageRemove = onImageRemove;
        this.CreateElements();
    }

    CreateElements() {
        // Create right side (image)
        this.SetDisplay(Display.Flex)
            .SetFlexDirection(FlexDirection.Column)
            .SetJustifyContent(JustifyContent.Start)
            .SetAlignItems(AlignItems.Center)
            .SetStyle('gap', '12px')
            .SetWidth(280)
            .SetClassName('car-card-image');

        // Create image container
        const imageContainer = new IElement(document.createElement('div'));
        imageContainer
            .SetDisplay(Display.Flex)
            .SetJustifyContent(JustifyContent.Center)
            .SetAlignItems(AlignItems.Center)
            .SetWidth(280)
            .SetHeight(218)
            .SetStyle('background-color', '#f5f5f5')
            .SetStyle('border-radius', '8px')
            .SetStyle('position', 'relative')
            .SetClassName('car-card-image-container');

        // Create remove photo button
        const removePhotoButton = document.createElement('button');
        removePhotoButton.textContent = '✕';
        this._removePhotoButton = new Button(removePhotoButton);
        this._removePhotoButton
            .SetStyle('position', 'absolute')
            .SetStyle('top', '8px')
            .SetStyle('right', '8px')
            .SetStyle('width', '24px')
            .SetStyle('height', '24px')
            .SetStyle('border-radius', '12px')
            .SetStyle('color', '#ffffff')
            .SetStyle('font-size', '14px')
            .SetStyle('display', 'none')  // Start hidden
            .SetStyle('justify-content', 'center')
            .SetStyle('align-items', 'center')
            .SetStyle('cursor', 'pointer')
            .SetColors(
                new Color(97, 97, 97, 0.8),    // Normal state - dark gray
                new Color(140, 140, 140, 0.9), // Hover state - lighter gray
                new Color(97, 97, 97, 1.0)     // Active state - solid dark gray
            )
            .OnClick(() => {
                if (this._onImageRemove) {
                    this._onImageRemove();
                }
            });

        // Create image display
        this._imageDisplay = new ImageDisplay();
        imageContainer
            .AppendChild(this._imageDisplay)
            .AppendChild(this._removePhotoButton);

        // Create image upload button
        this._imageUpload = new ImageUpload((base64Image) => {
            if (this._onImageChange) {
                this._onImageChange(base64Image);
            }
            this._imageDisplay.Render(base64Image);
            this.UpdateRemoveButton(true);
        });

        this._imageUpload
            .SetStyle('width', 'fit-content')
            .SetBackgroundColor(new Color(33, 150, 243))
            .SetColor(new Color(255, 255, 255))
            .SetStyle('opacity', '0')
            .SetStyle('pointer-events', 'none')
            .SetClassName('car-card-image-upload');

        this.AppendChild(imageContainer)
            .AppendChild(this._imageUpload);
    }

    SetImage(base64) {
        if (base64) {
            this._imageDisplay.Render(base64);
            this.UpdateRemoveButton(true);
        } else {
            this.Clear();
        }
    }

    Clear() {
        this._imageDisplay.Clear();
        this.UpdateRemoveButton(false);
    }

    UpdateRemoveButton(hasImage) {
        if (this._editMode && hasImage) {
            this._removePhotoButton.SetDisplay(Display.Flex);
        } else {
            this._removePhotoButton.SetDisplay(Display.None);
        }
    }

    SetEditMode(editMode) {
        this._editMode = editMode;
        if (editMode) {
            this._imageUpload
                .SetStyle('opacity', '1')
                .SetStyle('pointer-events', 'auto');
        } else {
            this._imageUpload
                .SetStyle('opacity', '0')
                .SetStyle('pointer-events', 'none');
        }
        // Update remove button visibility based on whether we have an image
        this.UpdateRemoveButton(this._imageDisplay.HasImage());
    }
}
