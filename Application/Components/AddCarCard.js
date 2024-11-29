class AddCarCard extends Card {
    _nameInput;
    _statusSelect;
    _addButton;
    _imageUpload;
    _imageDisplay;
    _onAdd;
    _selectedImage;

    constructor(onAdd) {
        super();
        this._onAdd = onAdd;
        this.CreateElements();
    }

    CreateElements() {
        const contentContainer = new IElement(document.createElement('div'));
        contentContainer
            .SetDisplay(Display.Flex)
            .SetFlexDirection(FlexDirection.Row)
            .SetStyle('gap', '24px')
            .SetHeightPercent(100)
            .SetId('add-car-card')
            .SetClassName('add-car-card');

        // Create left side (form)
        const leftSide = new IElement(document.createElement('div'));
        leftSide
            .SetDisplay(Display.Flex)
            .SetFlexDirection(FlexDirection.Column)
            .SetAlignItems(AlignItems.Start)
            .SetStyle('flex', '1')
            .SetClassName('add-car-card-left');

        // Create title
        const title = new Title('Adicionar Novo Carro');
        title
            .SetFontSize(24)
            .SetStyle('margin-bottom', '24px')
            .SetClassName('add-car-card-title');

        // Create name input
        this._nameInput = new InputField('Nome do Carro');
        this._nameInput
            .SetStyle('margin-bottom', '12px')
            .SetWidth(280)
            .SetClassName('add-car-card-name-input');

        // Create status select
        this._statusSelect = new IElement(document.createElement('select'));
        this._statusSelect
            .SetStyle('padding', '8px 12px')
            .SetStyle('border-radius', '4px')
            .SetStyle('border', '1px solid #ccc')
            .SetStyle('background-color', '#ffffff')
            .SetStyle('font-size', '14px')
            .SetWidth(280)
            .SetStyle('margin-bottom', '16px')
            .SetClassName('add-car-card-status-select');

        // Add status options
        const statuses = [
            { value: 0, label: 'Indisponível' }, 
            { value: 1, label: 'Disponível' },
        ];

        statuses.forEach(status => {
            const option = document.createElement('option');
            option.value = status.value;
            option.textContent = status.label;
            this._statusSelect.GetElement().appendChild(option);
        });

        // Create add button
        const button = document.createElement('button');
        button.textContent = 'Adicionar';
        this._addButton = new Button(button);
        this._addButton
            .SetColors(
                new Color(33, 150, 243),  // Blue
                new Color(30, 136, 229),  // Darker blue
                new Color(25, 118, 210)   // Even darker blue
            )
            .SetColor(new Color(255, 255, 255))
            .SetWidth(280)
            .SetClassName('add-car-card-add-button')
            .OnClick(() => this.HandleAdd());

        // Add elements to left side
        leftSide
            .AppendChild(title)
            .AppendChild(this._nameInput)
            .AppendChild(this._statusSelect)
            .AppendChild(this._addButton);

        // Create right side (image)
        const rightSide = new IElement(document.createElement('div'));
        rightSide
            .SetDisplay(Display.Flex)
            .SetFlexDirection(FlexDirection.Column)
            .SetAlignItems(AlignItems.Center)
            .SetJustifyContent(JustifyContent.Start)
            .SetStyle('gap', '12px')
            .SetStyle('flex', '0 0 220px')
            .SetClassName('add-car-card-image');

        // Create image container
        const imageContainer = new IElement(document.createElement('div'));
        imageContainer
            .SetDisplay(Display.Flex)
            .SetJustifyContent(JustifyContent.Center)
            .SetAlignItems(AlignItems.Center)
            .SetWidth(280)  
            .SetHeight(220)  
            .SetStyle('background-color', '#f5f5f5')
            .SetStyle('border-radius', '8px');

        // Create image display
        this._imageDisplay = new ImageDisplay();
        imageContainer.AppendChild(this._imageDisplay);

        // Create image upload
        this._imageUpload = new ImageUpload((base64Image) => {
            this._selectedImage = base64Image;
            this._imageDisplay.Render(base64Image);
        });
        this._imageUpload
            .SetStyle('width', 'fit-content')
            .SetBackgroundColor(new Color(33, 150, 243))  
            .SetColor(new Color(255, 255, 255));

        rightSide
            .AppendChild(imageContainer)
            .AppendChild(this._imageUpload);

        // Add sides to content container
        contentContainer
            .AppendChild(leftSide)
            .AppendChild(rightSide);

        this.SetContent(contentContainer);
    }

    HandleAdd() {
        const name = this._nameInput.GetValue().trim();
        const status = this._statusSelect.GetElement().value;

        if (!name) {
            SystemMessage.ShowMessage('Por favor, insira o nome do carro.', SystemMessage.MessageType.Error);
            return;
        }
        
        LoadingScreen.GetInstance().Show();
        
        CarModel.Post(name, parseInt(status), this._selectedImage, 
            () => {
                LoadingScreen.GetInstance().Hide();
                SystemMessage.ShowMessage('Carro adicionado com sucesso!', SystemMessage.MessageType.Success);

                // Clear inputs
                this._nameInput.SetValue('');
                this._statusSelect.GetElement().value = StatusCar.Available;
                this._imageUpload.Clear();
                this._imageDisplay.Clear();
                this._selectedImage = null;

                // Notify parent to refresh car list
                if (this._onAdd) {
                    this._onAdd();
                }
            }, 
            error => {
                LoadingScreen.GetInstance().Hide();
                SystemMessage.ShowMessage('Ocorreu um erro inesperado.');
            }
        );
    }
}
