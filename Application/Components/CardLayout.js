class CardLayout extends IElement {
    constructor() {
        const element = document.createElement('div');
        super(element);
        this.SetStyles();
        this.SetupResizeHandler();
    }

    SetStyles() {
        this.SetDisplay(Display.Grid)
            .SetStyle('justify-content', 'center')
            .SetStyle('align-items', 'center')
            .SetStyle('gap', '20px')
            .SetStyle('padding', '20px')
            .SetStyle('margin', '0 auto')
            .SetStyle('width', '100%')
            .SetStyle('max-width', '1400px')
            .SetStyle('box-sizing', 'border-box')
            .SetStyle('justify-items', 'center')
            .SetClassName('dashboard-cards-container');

        this.UpdateLayout();
        return this;
    }

    SetupResizeHandler() {
        window.addEventListener('resize', () => {
            this.UpdateLayout();
        });
    }

    CalculateScale(screenWidth, minScale, maxScale, startWidth = 768, endWidth = 1300) {
        const range = maxScale - minScale;
        const currentPoint = (screenWidth - startWidth) / (endWidth - startWidth); // Normalize to 0-1
        return Math.min(maxScale, Math.max(minScale, minScale + currentPoint * range));
    }

    UpdateLayout() {
        const width = window.innerWidth;
        const cardWidth = 630;
        let scale;
        
        // Calculate scale with smooth transitions between breakpoints
        if (width <= 768) {
            // Mobile: dynamic scale based on screen width
            scale = (width * 0.85) / cardWidth;
            this.SetStyle('gridTemplateColumns', '1fr');
        } 
        else if (width <= 1024) {
            // Transition from mobile to tablet
            scale = this.CalculateScale(width, 0.55, 0.65, 768, 1024);
            this.SetStyle('gridTemplateColumns', 'repeat(2, auto)');
        }
        else if (width <= 1300) {
            // Transition from tablet to desktop
            scale = this.CalculateScale(width, 0.65, 0.85, 1024, 1300);
            this.SetStyle('gridTemplateColumns', 'repeat(2, auto)');
        }
        else if (width <= 1600) {
            // Transition from desktop to large desktop
            scale = this.CalculateScale(width, 0.85, 0.95, 1300, 1600);
            this.SetStyle('gridTemplateColumns', 'repeat(2, auto)');
        }
        else if (width <= 1900) {
            // Large desktop
            scale = 0.95;
            this.SetStyle('gridTemplateColumns', 'repeat(2, auto)');
        }
        else {
            // Extra large desktop - 3 columns
            scale = 0.95;
            this.SetStyle('gridTemplateColumns', 'repeat(3, auto)');
        }

        this.SetStyle('gap', '20px');
        
        // Apply the calculated scale
        this.AdjustCards(scale);
    }

    AdjustCards(scale) {
        const cards = this.GetElement().children;
        for (let card of cards) {
            // Reset any previous styles
            card.style.zoom = '';
            card.style.margin = '';
            
            // Apply zoom
            console.log(scale);
            card.style.zoom = scale;
        }
    }

    AddCard(card) {
        // Create wrapper div
        const wrapper = document.createElement('div');
        wrapper.classList.add('card-wrapper');
        wrapper.style.width = '100%';
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'center';
        wrapper.style.alignItems = 'flex-start';
        
        // Reset any existing styles
        card.style.zoom = '';
        card.style.margin = '';
        
        // Add card to wrapper
        wrapper.appendChild(card);
        this.AppendChild(wrapper);
        
        // Update layout
        this.UpdateLayout();
        return this;
    }

    Clear() {
        while (this.GetElement().firstChild) {
            this.GetElement().removeChild(this.GetElement().firstChild);
        }
        return this;
    }
}

// Export the class
window.CardLayout = CardLayout;
