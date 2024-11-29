class App {
    constructor() {
        this.viewContainer = document.getElementById('ViewContainer');
        this.currentView = null;
        this.initialize();
    }

    initialize() {
        Account.Initialize();

        if (Account.GetToken()) {

            this.showView('dashboard');

        } else {

            this.showView('login');

        }
    }

    showView(viewName) {
        this.viewContainer.innerHTML = '';

        let view;
        switch(viewName) {
            case 'login':
                view = new LoginView();
                break;
            case 'signup':
                view = new SignupView();
                break;
            case 'dashboard':
                view = new DashboardView();
                break;
            default:
                console.error(`View ${viewName} not found`);
                return;
        }
        
        this.currentView = view;
        this.viewContainer.appendChild(view.GetElement());
        
    }

    getCurrentView() {
        return this.currentView;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
