class CarCard extends Card {
    _car;
    _nameElement;
    _statusElement;
    _editMode = false;
    _nameInput;
    _statusSelect;
    _editButton;
    _imageDisplay;
    _imageUpload;
    _removePhotoButton;
    _onEdit;
    _onDelete;

    constructor(car, onEdit, onDelete) {
        super();
        this._car = car;
        this._car.originalBase64 = car.base64;  // Store original base64
        this._onEdit = onEdit;
        this._onDelete = onDelete;
        this.CreateElements(car);
    }

    CreateElements(car) {
        const contentContainer = new IElement(document.createElement('div'));
        contentContainer
            .SetDisplay(Display.Flex)
            .SetFlexDirection(FlexDirection.Row)
            .SetStyle('gap', '20px')
            .SetHeightPercent(100)
            //.SetPaddingSymmetric(32, 0)
            .SetStyle('padding-bottom', '0')
            .SetId(`car-card-${car.id}`)
            .SetClassName('car-card');

        // Create left side (text and status)
        const leftSide = new IElement(document.createElement('div'));
        leftSide
            .SetDisplay(Display.Flex)
            .SetFlexDirection(FlexDirection.Column)
            .SetAlignItems(AlignItems.Start)
            .SetStyle('flex', '1')
            .SetClassName('car-card-left');

        // Create name element
        this._nameElement = new Title(car.name);
        this._nameElement.SetFontSize(24)
            .SetStyle('margin-bottom', '8px')
            .SetClassName('car-card-name');

        // Create name input for edit mode
        this._nameInput = new InputField('Nome do Carro');
        this._nameInput.SetValue(car.name)
            .SetStyle('margin-bottom', '12px')
            .SetWidth(280)
            .SetDisplay(Display.None)
            .SetClassName('car-card-name-input');

        // Create status element
        this._statusElement = new IElement(document.createElement('div'));
        this._statusElement.SetDisplay(Display.InlineBlock)
            .SetPaddingSymmetric(6, 12)
            .SetBorderRadius(16)
            .SetStyle('background-color', car.status === StatusCar.Available ? '#e8f5e9' : '#ffebee')
            .SetStyle('color', car.status === StatusCar.Available ? '#2e7d32' : '#c62828')
            .SetStyle('font-size', '14px')
            .SetStyle('font-weight', '500')
            .SetTextContent(car.status === StatusCar.Available ? 'Disponível' : 'Indisponível')
            .SetClassName('car-card-status');

        // Create status select for edit mode
        this._statusSelect = new IElement(document.createElement('select'));
        this._statusSelect.SetStyle('padding', '8px 12px')
            .SetStyle('border-radius', '4px')
            .SetStyle('border', '1px solid #ccc')
            .SetStyle('background-color', '#ffffff')
            .SetStyle('font-size', '14px')
            .SetWidth(280)
            .SetStyle('margin-bottom', '16px')
            .SetDisplay(Display.None)
            .SetClassName('car-card-status-select');

        const statuses = [
            { value: StatusCar.Available, label: 'Disponível' },
            { value: StatusCar.Unavailable, label: 'Indisponível' }
        ];

        statuses.forEach(statusOption => {
            const option = document.createElement('option');
            option.value = statusOption.value;
            option.textContent = statusOption.label;
            if (statusOption.value === car.status) {
                option.selected = true;
            }
            this._statusSelect.GetElement().appendChild(option);
        });

        // Create edit button for edit mode
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Salvar';
        this._editButton = new Button(saveButton);
        this._editButton
            .SetColors(
                new Color(76, 175, 80),  // Green
                new Color(67, 160, 71),  // Darker green
                new Color(56, 142, 60)   // Even darker green
            )
            .SetColor(new Color(255, 255, 255))
            .SetWidth(280)
            .SetDisplay(Display.None)
            .SetClassName('car-card-edit-button')
            .OnClick(() => this.SaveChanges());

        leftSide.AppendChild(this._nameElement)
            .AppendChild(this._nameInput)
            .AppendChild(this._statusElement)
            .AppendChild(this._statusSelect)
            .AppendChild(this._editButton);

        // Create right side (image)
        const rightSide = new IElement(document.createElement('div'));
        rightSide
            .SetDisplay(Display.Flex)
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
            .SetStyle('background-color', 'rgba(97, 97, 97, 0.8)')
            .SetStyle('color', '#ffffff')
            .SetStyle('font-size', '14px')
            .SetStyle('display', 'none')  // Start hidden
            .SetStyle('justify-content', 'center')
            .SetStyle('align-items', 'center')
            .SetStyle('cursor', 'pointer')
            .OnClick(() => this.HandleRemovePhoto());

        // Create image display
        this._imageDisplay = new ImageDisplay();
        imageContainer
            .AppendChild(this._imageDisplay)
            .AppendChild(this._removePhotoButton);

        if (car.base64) {
            this._imageDisplay.Render(car.base64);
        }

        // Create image upload button
        this._imageUpload = new ImageUpload((base64Image) => {
            this._car.base64 = base64Image;
            this._imageDisplay.Render(base64Image);
            this._onEdit(this._car);
        });
        this._imageUpload
            .SetStyle('width', 'fit-content')
            .SetBackgroundColor(new Color(33, 150, 243))
            .SetColor(new Color(255, 255, 255))
            .SetStyle('opacity', '0')
            .SetStyle('pointer-events', 'none')
            .SetClassName('car-card-image-upload');

        rightSide
            .AppendChild(imageContainer)
            .AppendChild(this._imageUpload);

        // Create actions container
        const actionsContainer = new IElement(document.createElement('div'));
        actionsContainer
            .SetDisplay(Display.Flex)
            .SetStyle('position', 'absolute')
            .SetStyle('top', '16px')
            .SetStyle('right', '16px')
            .SetStyle('gap', '8px')
            .SetClassName('car-card-actions');

        const editButton = new IElement(document.createElement('button'));
        editButton
            .SetStyle('background', 'none')
            .SetStyle('border', 'none')
            .SetInnerHTML('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>')
            .AddEventListener('click', () => this.ToggleEditMode())
            .SetClassName('car-card-edit-icon');

        const deleteButton = new IElement(document.createElement('button'));
        deleteButton
            .SetStyle('background', 'none')
            .SetStyle('border', 'none')
            .SetInnerHTML('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"></path><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v2"></path></svg>')
            .AddEventListener('click', () => this.HandleDelete())
            .SetClassName('car-card-delete-icon');

        actionsContainer
            .AppendChild(editButton)
            .AppendChild(deleteButton);

        contentContainer.AppendChild(leftSide)
            .AppendChild(rightSide)
            .AppendChild(actionsContainer);

        this.SetContent(contentContainer);
    }

    UpdateStatusStyle() {
        const statusText = this._statusElement.GetElement();
        statusText.textContent = this._car.status === StatusCar.Available ? 'Disponível' : 'Indisponível';

        const statusColor = this._car.status === StatusCar.Available ? 
            new Color(76, 175, 80) :  // Green for available
            new Color(244, 67, 54);   // Red for unavailable

        this._statusElement
            .SetBackgroundColor(statusColor.WithAlpha(0.1))
            .SetColor(statusColor);
    }

    SaveChanges() {
        const newName = this._nameInput.GetValue();
        const newStatus = parseInt(this._statusSelect.GetElement().value);
        const photoChanged = this._car.base64 !== this._car.originalBase64;

        if (newName !== this._car.name || newStatus !== this._car.status || photoChanged) {
            // Show loading state
            LoadingScreen.GetInstance().Show();
            this._editButton.GetElement().disabled = true;

            CarModel.Put(
                this._car.id,
                newName,
                newStatus,
                this._car.base64,
                () => {
                    // Update successful
                    this._car.name = newName;
                    this._car.status = newStatus;
                    this._car.originalBase64 = this._car.base64;  // Update original base64
                    this._nameElement.SetTextContent(newName);
                    this.UpdateStatusStyle();
                    
                    // Hide loading and restore UI
                    LoadingScreen.GetInstance().Hide();
                    this._editButton.GetElement().disabled = false;
                    this._editMode = false;
                    this.UpdateEditMode();
                    
                    SystemMessage.ShowMessage('Carro atualizado com sucesso!', SystemMessage.MessageType.Success);
                },
                (error) => {
                    // Hide loading and restore UI
                    LoadingScreen.GetInstance().Hide();
                    this._editButton.GetElement().disabled = false;
                    
                    SystemMessage.ShowMessage('Erro ao atualizar o carro: ' + error.message, SystemMessage.MessageType.Error);
                }
            );
        } else {
            this._editMode = false;
            this.UpdateEditMode();
        }
    }

    ToggleEditMode() {
        if (this._editMode) {
            this.SaveChanges();
        } else {
            this._editMode = true;
            this.UpdateEditMode();
        }
    }

    UpdateEditMode() {
        if (this._editMode) {
            this._nameElement.SetDisplay(Display.None);
            this._nameInput.SetDisplay(Display.Block);
            this._statusElement.SetDisplay(Display.None);
            this._statusSelect.SetDisplay(Display.Block);
            this._editButton.SetDisplay(Display.Block);
            this._imageUpload
                .SetStyle('opacity', '1')
                .SetStyle('pointer-events', 'auto');
            // Only show remove button in edit mode AND if there's a photo
            this._removePhotoButton.SetDisplay(this._car.base64 ? Display.Flex : Display.None);
        } else {
            this._nameElement.SetDisplay(Display.Block);
            this._nameInput.SetDisplay(Display.None);
            this._statusElement.SetDisplay(Display.Block);
            this._statusSelect.SetDisplay(Display.None);
            this._editButton.SetDisplay(Display.None);
            this._imageUpload
                .SetStyle('opacity', '0')
                .SetStyle('pointer-events', 'none');
            // Always hide remove button in view mode
            this._removePhotoButton.SetDisplay(Display.None);
        }
    }

    HandleRemovePhoto() {
        this._car.base64 = null;
        this._imageDisplay.Clear();
        this._removePhotoButton.SetDisplay(Display.None);
    }

    HandleDelete() {
        new PopupDialog(
            'Confirmar Exclusão',
            `Tem certeza que deseja excluir o carro "${this._car.name}"?`,
            () => {
                if (this._onDelete) {
                    this._onDelete(this._car);
                }
            }
        );
    }
}
