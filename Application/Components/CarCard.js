class CarCard extends Card {
    _car;
    _nameElement;
    _statusElement;
    _editMode = false;
    _nameInput;
    _statusSelect;
    _editButton;
    _imageControl;
    _onEdit;
    _onDelete;
    _editIcon;

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

        // Create image control
        this._imageControl = new ImageControl(
            (base64Image) => {
                this._car.base64 = base64Image;
            },
            () => this.HandleRemovePhoto()
        );
        
        if (car.base64) {
            this._imageControl.SetImage(car.base64);
        }

        // Create actions container
        const actionsContainer = new IElement(document.createElement('div'));
        actionsContainer
            .SetDisplay(Display.Flex)
            .SetStyle('position', 'absolute')
            .SetStyle('top', '10px')
            .SetStyle('right', '16px')
            .SetStyle('gap', '8px')
            .SetClassName('car-card-actions');

        // Create edit button
        const editButton = new IHoverable(document.createElement('button'));
        this._editIcon = editButton;  // Store reference to update in edit mode
        editButton
            .SetStyle('background', 'none')
            .SetStyle('border', 'none')
            .SetStyle('padding', '8px')
            .SetStyle('border-radius', '4px')
            .SetStyle('cursor', 'pointer')
            .SetStyle('transition', 'background-color 0.2s')
            .SetInnerHTML('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>')
            .SetColors(new Color(0, 0, 0, 0), new Color(0, 0, 0, 0.05), new Color(0, 0, 0, 0.1))
            .AddEventListener('click', () => this.ToggleEditMode())
            .SetClassName('car-card-edit-icon');

        const deleteButton = new IHoverable(document.createElement('button'));
        deleteButton
            .SetStyle('background', 'none')
            .SetStyle('border', 'none')
            .SetStyle('padding', '8px')
            .SetStyle('border-radius', '4px')
            .SetStyle('cursor', 'pointer')
            .SetStyle('transition', 'background-color 0.2s')
            .SetInnerHTML('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"></path><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v2"></path></svg>')
            .SetColors(new Color(0, 0, 0, 0), new Color(0, 0, 0, 0.05), new Color(0, 0, 0, 0.1))
            .AddEventListener('click', () => this.HandleDelete())
            .SetClassName('car-card-delete-icon');

        actionsContainer
            .AppendChild(editButton)
            .AppendChild(deleteButton);

        contentContainer.AppendChild(leftSide)
            .AppendChild(this._imageControl)
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
        const newName = this._nameInput.GetValue().trim();
        const newStatus = parseInt(this._statusSelect.GetElement().value);
        const photoChanged = this._car.base64 !== this._car.originalBase64;

        if (!newName) {
            SystemMessage.ShowMessage('Por favor, insira o nome do carro.', SystemMessage.MessageType.Error);
            return;
        }

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
                    
                    // Restore original base64 on error
                    this._car.base64 = this._car.originalBase64;
                    this._imageControl.SetImage(this._car.base64);
                    
                    SystemMessage.ShowMessage('Erro ao atualizar o carro.', SystemMessage.MessageType.Error);
                }
            );
        } else {
            this._editMode = false;
            this.UpdateEditMode();
        }
    }

    ToggleEditMode() {
        this._editMode = !this._editMode;
        
        if (!this._editMode) {
            // Restore original values when cancelling edit
            this._nameInput.SetValue(this._car.name);
            this._statusSelect.GetElement().value = this._car.status;
            if (this._car.base64 !== this._car.originalBase64) {
                this._car.base64 = this._car.originalBase64;
                this._imageControl.SetImage(this._car.base64);
            }
        }
        
        this.UpdateEditMode();
    }

    UpdateEditMode() {
        if (this._editMode) {
            this._nameElement.SetDisplay(Display.None);
            this._nameInput.SetDisplay(Display.Block);
            this._statusElement.SetDisplay(Display.None);
            this._statusSelect.SetDisplay(Display.Block);
            this._editButton.SetDisplay(Display.Block);
            this._imageControl.SetEditMode(true);
            // Set darker background when in edit mode
            this._editIcon.SetColors(
                new Color(0, 0, 0, 0.1),  // Default darker in edit mode
                new Color(0, 0, 0, 0.15),  // Hover
                new Color(0, 0, 0, 0.2)   // Active
            );
        } else {
            this._nameElement.SetDisplay(Display.Block);
            this._nameInput.SetDisplay(Display.None);
            this._statusElement.SetDisplay(Display.Block);
            this._statusSelect.SetDisplay(Display.None);
            this._editButton.SetDisplay(Display.None);
            this._imageControl.SetEditMode(false);
            // Reset to transparent when not in edit mode
            this._editIcon.SetColors(
                new Color(0, 0, 0, 0),    // Default transparent
                new Color(0, 0, 0, 0.05),  // Hover
                new Color(0, 0, 0, 0.1)   // Active
            );
        }
    }

    HandleRemovePhoto() {
        this._car.base64 = null;
        this._imageControl.Clear();
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
