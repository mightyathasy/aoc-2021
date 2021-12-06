class MyIntArray {

    // Input is only an array of integers
    constructor(aArray) {
        this._array = new Uint8Array(aArray);
        this.length = this._array.length;

        return new Proxy(this, {
            get: (_, prop) => {
                if(Number.isInteger(parseInt(prop))) {
                    return this._getArray()[parseInt(prop)];
                }

                var property = this[prop];
                if(typeof property === "function") {
                    return (...args) => {
                        property.apply(this, args);
                    }
                }

                return property;
            },
            set: (_, prop, value) => {
                if(Number.isInteger(parseInt(prop))) {
                    return Reflect.set(this._array, prop, value);
                }
            }
        })
    }

    push = (iElementToPush) => {
        var newArray = new Uint8Array(this.length + 1);
        this._array.forEach((currentElement, index) => {
            newArray[index] = currentElement;
        })
        newArray[this.length] = iElementToPush;
        this._array = newArray;
        this.length += 1;
    }

    forEach = (fnCallback) => {
        this._array.forEach(fnCallback);
    }

    _getArray = () => {
        return this._array;
    }

}

export default MyIntArray