class Color {
    _r;
    _g;
    _b;
    _a;

    constructor(r, g, b, a = 1) {
        this._r = Math.max(0, Math.min(255, r));
        this._g = Math.max(0, Math.min(255, g));
        this._b = Math.max(0, Math.min(255, b));
        this._a = Math.max(0, Math.min(1, a));
    }

    static FromHex(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? new Color(
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ) : null;
    }

    WithAlpha(alpha) {
        return new Color(this._r, this._g, this._b, alpha);
    }

    toString() {
        if (this._a === 1) {
            return `rgb(${this._r}, ${this._g}, ${this._b})`;
        }
        return `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`;
    }
}
