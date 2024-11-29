class DashboardView extends IElement {
    _cardsContainer;
    _loadingElement;
    _cars = [];
    _logoutButton;

    constructor() {
        const element = document.createElement('div');
        super(element);
        this.SetStyles();
        this.CreateElements();
        this.LoadCars();
    }

    SetStyles() {
        // Main container styles
        this.SetStyle('width', '100%')
            .SetStyle('maxWidth', '1200px')
            .SetStyle('margin', '0 auto')
            .SetStyle('padding', '40px 20px');

        // Create and style cards container
        this._cardsContainer = new IElement(document.createElement('div'));
        this._cardsContainer
            .SetDisplay(Display.Grid)
            .SetStyle('gridTemplateColumns', 'repeat(2, 630px)')
            .SetStyle('justify-content', 'center')
            .SetStyle('column-gap', '20px')
            .SetStyle('row-gap', '20px')
            .SetStyle('padding', '32px')
            .SetStyle('margin', '0 auto')
            .SetClassName('dashboard-cards-container');

        // Create loading element
        this._loadingElement = new Loading();
    }

    CreateElements() {
        // Create header
        const header = new IElement(document.createElement('div'));
        header
            .SetDisplay(Display.Flex)
            .SetJustifyContent(JustifyContent.SpaceBetween)
            .SetAlignItems(AlignItems.Center)
            .SetMarginBottom(32);

        // Create title container
        const titleContainer = new IElement(document.createElement('div'));
        
        const title = new Title('CarroAPI')
        .SetFontSize(32)
        .SetMarginBottom(8);

        titleContainer.AppendChild(title);

        // Create logout button
        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Sair';
        this._logoutButton = new Button(logoutButton);
        this._logoutButton
            .SetColors(
                new Color(244, 67, 54),   // Red
                new Color(229, 57, 53),   // Darker red
                new Color(211, 47, 47)    // Even darker red
            )
            .SetColor(new Color(255, 255, 255))
            .SetPadding(8, 16, 8, 16)
            .SetBorderRadius(4)
            .AddEventListener('click', () => this.HandleLogout());

        // Add elements to header
        header
            .AppendChild(titleContainer)
            .AppendChild(this._logoutButton);

        // Add elements to main container
        this.AppendChild(header)
            .AppendChild(this._cardsContainer)
            .AppendChild(this._loadingElement);
    }

    HandleLogout() {
        // Clear any stored data
        this._cars = [];
        
        // Clear authentication data
        Account.Clear();
        
        // Return to login view
        const app = document.getElementById('ViewContainer');
        if (app) {
            app.innerHTML = '';
            app.appendChild(new LoginView().GetElement());
        }

        SystemMessage.ShowMessage('Logout realizado com sucesso!', SystemMessage.MessageType.Success);
    }

    LoadCars() {
        this._loadingElement.Show();
        this._cardsContainer.SetDisplay(Display.None);

        CarModel.GetAll(
            // onSuccess
            (cars) => {
                this._cars = cars;
                this._loadingElement.Hide();
                this._cardsContainer.SetDisplay(Display.Grid);
                
                // Clear existing cars
                this._cardsContainer.SetInnerHTML('');
                
                // Add the AddCarCard first
                const addCard = new AddCarCard((newCar) => this.HandleAddCar(newCar));
                this._cardsContainer.AppendChild(addCard);
                
                // Add the car cards
                this._cars.forEach(car => {
                    const card = new CarCard(
                        car,
                        (updatedCar) => this.HandleEditCar(updatedCar),
                        (carToDelete) => this.HandleDeleteCar(carToDelete)
                    );
                    this._cardsContainer.AppendChild(card);
                });
            },
            // onError
            (error) => {
                SystemMessage.ShowMessage('Erro ao carregar os carros: ' + error.message, SystemMessage.MessageType.Error);
                this._loadingElement.Hide();
            }
        );
    }

    HandleAddCar(newCar) {
        // Generate a new ID (in a real app, this would come from the server)
        newCar.id = Math.max(...this._cars.map(car => car.id), 0) + 1;
        
        // Add to local array
        this._cars.push(newCar);
        
        // Refresh the view
        this.LoadCars();
        
        SystemMessage.ShowMessage('Carro adicionado com sucesso!', SystemMessage.MessageType.Success);
    }

    HandleEditCar(updatedCar) {
        // Update local array
        const index = this._cars.findIndex(car => car.id === updatedCar.id);
        if (index !== -1) {
            this._cars[index] = updatedCar;
            SystemMessage.ShowMessage('Carro atualizado com sucesso!', SystemMessage.MessageType.Success);
        }
    }

    HandleDeleteCar(carToDelete) {
        LoadingScreen.GetInstance().Show();
        
        CarModel.Delete(
            carToDelete.id,
            () => {
                // Remove from local array
                this._cars = this._cars.filter(car => car.id !== carToDelete.id);
                
                // Refresh the view
                this.LoadCars();
                
                LoadingScreen.GetInstance().Hide();
                SystemMessage.ShowMessage('Carro removido com sucesso!', SystemMessage.MessageType.Success);
            },
            (error) => {
                LoadingScreen.GetInstance().Hide();
                SystemMessage.ShowMessage('Erro ao remover o carro: ' + error.message, SystemMessage.MessageType.Error);
            }
        );
    }
}
