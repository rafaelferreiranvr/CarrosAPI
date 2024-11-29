class IElement {
    _element;

    constructor(element) {
        Typing.TypeCheck(element, HTMLElement);
        this._element = element;
    }

    GetElement() {
        return this._element;
    }

    SetId(value) {
        Typing.TypeCheck(value, String);
        this._element.id = value;
        return this;
    }

    SetClassName(value) {
        Typing.TypeCheck(value, String);
        this._element.className = value;
        return this;
    }

    AddClass(value) {
        Typing.TypeCheck(value, String);
        this._element.classList.add(value);
        return this;
    }

    RemoveClass(value) {
        Typing.TypeCheck(value, String);
        this._element.classList.remove(value);
        return this;
    }

    SetStyle(property, value) {
        Typing.TypeCheck(property, String);
        Typing.TypeCheck(value, String);
        this._element.style[property] = value;
        return this;
    }

    SetPadding(top, right, bottom, left) {
        Typing.TypeCheck(top, Number);
        Typing.TypeCheck(right, Number);
        Typing.TypeCheck(bottom, Number);
        Typing.TypeCheck(left, Number);
        this._element.style.padding = `${top}px ${right}px ${bottom}px ${left}px`;
        return this;
    }

    SetPaddingSymmetric(vertical, horizontal) {
        Typing.TypeCheck(vertical, Number);
        Typing.TypeCheck(horizontal, Number);
        this._element.style.padding = `${vertical}px ${horizontal}px`;
        return this;
    }

    SetMargin(top, right, bottom, left) {
        Typing.TypeCheck(top, Number);
        Typing.TypeCheck(right, Number);
        Typing.TypeCheck(bottom, Number);
        Typing.TypeCheck(left, Number);
        this._element.style.margin = `${top}px ${right}px ${bottom}px ${left}px`;
        return this;
    }

    SetMarginSymmetric(vertical, horizontal) {
        Typing.TypeCheck(vertical, Number);
        if (typeof horizontal === 'string') {
            Typing.EnumCheck(horizontal, MarginValue);
        } else {
            Typing.TypeCheck(horizontal, Number);
        }
        const horizontalValue = typeof horizontal === 'number' ? `${horizontal}px` : horizontal;
        this._element.style.margin = `${vertical}px ${horizontalValue}`;
        return this;
    }

    SetMarginBottom(value) {
        Typing.TypeCheck(value, Number);
        this._element.style.marginBottom = `${value}px`;
        return this;
    }

    SetBorder(width, style, color) {
        Typing.TypeCheck(width, Number);
        Typing.TypeCheck(style, String);
        Typing.TypeCheck(color, Color);
        this._element.style.border = `${width}px ${style} ${color.toString()}`;
        return this;
    }

    SetBorderTop(width, style, color) {
        Typing.TypeCheck(width, Number);
        Typing.TypeCheck(style, String);
        Typing.TypeCheck(color, Color);
        this._element.style.borderTop = `${width}px ${style} ${color.toString()}`;
        return this;
    }

    SetBorderRadius(value) {
        Typing.TypeCheck(value, Number);
        this._element.style.borderRadius = `${value}px`;
        return this;
    }

    SetCursor(value) {
        Typing.TypeCheck(value, String);
        Typing.EnumCheck(value, Cursor);
        this._element.style.cursor = value;
        return this;
    }

    SetFontSize(value) {
        Typing.TypeCheck(value, Number);
        this._element.style.fontSize = `${value}px`;
        return this;
    }

    SetWidth(value) {
        Typing.TypeCheck(value, Number);
        this._element.style.width = `${value}px`;
        return this;
    }

    SetWidthPercent(value) {
        Typing.TypeCheck(value, Number);
        this._element.style.width = `${value}%`;
        return this;
    }

    SetMaxWidth(value) {
        Typing.TypeCheck(value, Number);
        this._element.style.maxWidth = `${value}px`;
        return this;
    }

    SetMaxWidthPercent(value) {
        Typing.TypeCheck(value, Number);
        this._element.style.maxWidth = `${value}%`;
        return this;
    }

    SetDisplay(value) {
        Typing.TypeCheck(value, String);
        Typing.EnumCheck(value, Display);
        this._element.style.display = value;
        return this;
    }

    SetFlexDirection(value) {
        Typing.TypeCheck(value, String);
        Typing.EnumCheck(value, FlexDirection);
        this._element.style.flexDirection = value;
        return this;
    }

    SetGap(value) {
        Typing.TypeCheck(value, Number);
        this._element.style.gap = `${value}px`;
        return this;
    }

    SetColor(color) {
        Typing.TypeCheck(color, Color);
        this._element.style.color = color.toString();
        return this;
    }

    SetHeight(value) {
        Typing.TypeCheck(value, [Number, String]);
        this._element.style.height = typeof value === 'number' ? `${value}px` : value;
        return this;
    }

    SetHeightPercent(value) {
        Typing.TypeCheck(value, Number);
        this._element.style.height = `${value}%`;
        return this;
    }

    SetHeightAuto() {
        this._element.style.height = 'auto';
        return this;
    }

    SetBackgroundColor(color) {
        Typing.TypeCheck(color, Color);
        this._element.style.backgroundColor = color.toString();
        return this;
    }

    SetOverflow(value) {
        Typing.TypeCheck(value, String);
        Typing.EnumCheck(value, Overflow);
        this._element.style.overflow = value;
        return this;
    }

    SetJustifyContent(value) {
        Typing.TypeCheck(value, String);
        Typing.EnumCheck(value, JustifyContent);
        this._element.style.justifyContent = value;
        return this;
    }

    SetAlignItems(value) {
        Typing.TypeCheck(value, String);
        Typing.EnumCheck(value, AlignItems);
        this._element.style.alignItems = value;
        return this;
    }

    SetLineHeight(value) {
        Typing.TypeCheck(value, Number);
        this._element.style.lineHeight = value.toString();
        return this;
    }

    SetBoxShadow(offsetX, offsetY, blurRadius, spreadRadius, color) {
        Typing.TypeCheck(offsetX, Number);
        Typing.TypeCheck(offsetY, Number);
        Typing.TypeCheck(blurRadius, Number);
        Typing.TypeCheck(spreadRadius, Number);
        Typing.TypeCheck(color, Color);
        this._element.style.boxShadow = `${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${color.toString()}`;
        return this;
    }

    SetTextAlign(value) {
        Typing.TypeCheck(value, String);
        Typing.EnumCheck(value, TextAlign);
        this._element.style.textAlign = value;
        return this;
    }

    SetAttribute(name, value) {
        Typing.TypeCheck(name, String);
        Typing.TypeCheck(value, String);
        this._element.setAttribute(name, value);
        return this;
    }

    GetAttribute(name) {
        Typing.TypeCheck(name, String);
        return this._element.getAttribute(name);
    }

    RemoveAttribute(name) {
        Typing.TypeCheck(name, String);
        this._element.removeAttribute(name);
        return this;
    }

    AddEventListener(event, callback) {
        Typing.TypeCheck(event, String);
        Typing.TypeCheck(callback, Function);
        this._element.addEventListener(event, callback);
        return this;
    }

    RemoveEventListener(event, callback) {
        Typing.TypeCheck(event, String);
        Typing.TypeCheck(callback, Function);
        this._element.removeEventListener(event, callback);
        return this;
    }

    AppendChild(child) {
        Typing.TypeCheck(child._element, HTMLElement);
        this._element.appendChild(child._element);
        return this;
    }

    RemoveChild(child) {
        Typing.TypeCheck(child._element, HTMLElement);
        this._element.removeChild(child._element);
        return this;
    }

    SetTextContent(value) {
        Typing.TypeCheck(value, String);
        this._element.textContent = value;
        return this;
    }

    SetInnerHTML(value) {
        Typing.TypeCheck(value, String);
        this._element.innerHTML = value;
        return this;
    }

    GetId() {
        return this._element.id;
    }

    GetClassList() {
        return this._element.classList;
    }

    HasClass(className) {
        Typing.TypeCheck(className, String);
        return this._element.classList.contains(className);
    }

    SetPosition(position) {
        Typing.TypeCheck(position, String);
        this._element.style.position = position;
        return this;
    }

    SetTop(value) {
        if (typeof value === 'number') {
            value = value + 'px';
        }
        Typing.TypeCheck(value, String);
        this._element.style.top = value;
        return this;
    }

    SetLeft(value) {
        if (typeof value === 'number') {
            value = value + 'px';
        }
        Typing.TypeCheck(value, String);
        this._element.style.left = value;
        return this;
    }

    SetZIndex(value) {
        Typing.TypeCheck(value, Number);
        this._element.style.zIndex = value;
        return this;
    }

    SetJustifyContent(value) {
        Typing.TypeCheck(value, String);
        this._element.style.justifyContent = value;
        return this;
    }

    SetAlignItems(value) {
        Typing.TypeCheck(value, String);
        this._element.style.alignItems = value;
        return this;
    }

    SetAnimation(value) {
        Typing.TypeCheck(value, String);
        this._element.style.animation = value;
        return this;
    }
}
