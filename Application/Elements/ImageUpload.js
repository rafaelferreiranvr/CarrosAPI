class ImageUpload extends IElement {
    _button;
    _fileInput;
    _onImageSelected;

    constructor(onImageSelected) {
        const container = document.createElement('div');
        super(container);
        
        this._onImageSelected = onImageSelected;
        this.CreateElements();
        this.SetStyles();
    }

    CreateElements() {
        // Create the hidden file input
        this._fileInput = document.createElement('input');
        this._fileInput.type = 'file';
        this._fileInput.accept = 'image/*';
        this._fileInput.style.display = 'none';
        this._fileInput.addEventListener('change', () => this.HandleFileSelection());

        // Create the button to trigger file selection
        this._button = new Button('Escolher Imagem');
        this._button.OnClick(() => this._fileInput.click());

        // Append elements
        this.AppendChild(this._button);
        document.body.appendChild(this._fileInput);
    }

    SetStyles() {
        // Container styles
        this.SetDisplay(Display.Flex)
            .SetStyle('gap', '12px')
            .SetWidthPercent(100);

        // Input styles
        // Removed reference to _input
    }

    HandleFileSelection() {
        const file = this._fileInput.files[0];
        if (file) {
            // Removed reference to _input
            // Convert to base64
            const reader = new FileReader();
            reader.onload = (e) => {
                if (this._onImageSelected) {
                    this._onImageSelected(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    Clear() {
        // Removed reference to _input
        this._fileInput.value = '';
    }
}
