class Typing {
    static TypeCheck(value, type) {
        const types = Array.isArray(type) ? type : [type];
        const valid = types.some(t => 
            t === String || t === Number || t === Boolean ? 
            value?.constructor === t : 
            value instanceof t
        );
        if (!valid) {
            throw new TypeError(`Expected one of [${types.map(t => t.name).join(', ')}], got ${value?.constructor?.name || typeof value}`);
        }
    }

    static EnumCheck(value, enumObject) {
        const validValues = Object.values(enumObject);
        if (!validValues.includes(value)) {
            throw new TypeError(`Invalid value: ${value}. Expected one of: ${validValues.join(', ')}`);
        }
    }
}
