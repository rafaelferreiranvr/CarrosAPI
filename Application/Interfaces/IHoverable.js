class IHoverable extends IElement {
    _defaultColor;
    _hoverColor;
    _activeColor;
    _hoveringMode = HoveringMode.Background;
    _textColor = null;
    _isMouseDown = false;

    constructor(element) {
        Typing.TypeCheck(element, HTMLElement);
        super(element);
        this._setupHoverEvents();
    }

    SetColors(defaultColor, hoverColor, activeColor) {
        Typing.TypeCheck(defaultColor, Color);
        
        this._defaultColor = defaultColor;
        this._hoverColor = hoverColor || this.DarkenColor(defaultColor, 0.1);
        this._activeColor = activeColor || this.DarkenColor(defaultColor, 0.2);
        
        if (this._element) {
            this._applyColor(this._defaultColor);
        }
        return this;
    }

    SetBackgroundColor(color) {
        return this.SetColors(color);
    }

    DarkenColor(color, amount) {
        const darkerColor = new Color(
            Math.max(0, color.r - Math.floor(255 * amount)),
            Math.max(0, color.g - Math.floor(255 * amount)),
            Math.max(0, color.b - Math.floor(255 * amount)),
            color.a
        );
        return darkerColor;
    }

    SetHoveringMode(mode) {
        Typing.TypeCheck(mode, String);
        Typing.EnumCheck(mode, HoveringMode);
        this._hoveringMode = mode;
        
        // Reset any previously set colors
        if (this._element) {
            if (this._hoveringMode === HoveringMode.Background) {
                if (!this._textColor) {
                    this._element.style.color = '';
                }
            } else {
                this._element.style.backgroundColor = '';
            }
            this._applyColor(this._defaultColor);
        }
        return this;
    }

    SetTextColor(color) {
        Typing.TypeCheck(color, Color);
        this._textColor = color;
        this._element.style.color = color.toString();
        return this;
    }

    _setupHoverEvents() {
        if (!this._element) return;

        this._element.style.transition = 'all 0.2s';
        // Only apply color if it's already set
        if (this._defaultColor) {
            this._applyColor(this._defaultColor);
        }

        this._element.addEventListener('mouseover', () => {
            if (!this._element.disabled && this._hoverColor) {
                if (!this._isMouseDown) {
                    this._applyColor(this._hoverColor);
                }
            }
        });

        this._element.addEventListener('mouseout', () => {
            if (!this._element.disabled && this._defaultColor) {
                this._isMouseDown = false;
                this._applyColor(this._defaultColor);
            }
        });

        this._element.addEventListener('mousedown', () => {
            if (!this._element.disabled && this._activeColor) {
                this._isMouseDown = true;
                this._applyColor(this._activeColor);
            }
        });

        this._element.addEventListener('mouseup', () => {
            if (!this._element.disabled) {
                this._isMouseDown = false;
                if (this._hoverColor) {
                    this._applyColor(this._hoverColor);
                }
            }
        });

        // Handle case when mouse up occurs outside the element
        document.addEventListener('mouseup', () => {
            if (this._isMouseDown && !this._element.disabled) {
                this._isMouseDown = false;
                this._applyColor(this._defaultColor);
            }
        });
    }

    _applyColor(color) {
        if (!color) return;
        
        if (this._hoveringMode === HoveringMode.Background) {
            if (this._textColor) {
                this._element.style.color = this._textColor.toString();
            }
            this._element.style.backgroundColor = color.toString();
        } else {
            this._element.style.backgroundColor = '';
            this._element.style.color = color.toString();
        }
    }
}
