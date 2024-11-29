class Panel extends IElement {
    constructor() {
        const element = document.createElement('div');
        super(element);
        this.setDefaultStyles();
    }

    setDefaultStyles() {
        this.SetStyle('width', '100%')
            .SetStyle('height', '100%')
            .SetStyle('display', 'flex')
            .SetStyle('flexDirection', 'column')
            .SetStyle('backgroundColor', '#f5f5f5')
            .SetStyle('overflow', 'hidden');
    }
}
