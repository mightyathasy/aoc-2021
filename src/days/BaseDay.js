class BaseDay {

    constructor(puzzle) {
        this._puzzle = parseInt(puzzle);
    }

    execute = (input) => {
        if(this._puzzle === 1) {
            return this._executePuzzle1(input);
        }
        if(this._puzzle === 2) {
            return this._executePuzzle2(input);
        }
    }

    // Has to be overridden in children
    _executePuzzle1 = (input) => {
        alert("Function '_executePuzzle1' is not overriden in child class!");
    }

    // Has to be overridden in children
    _executePuzzle2 = (input) => {
        alert("Function '_executePuzzle2' is not overriden in child class!");
    }

    // Transposes an array of arrays
    _transposeMatrix = (matrix) => {
        var lengthOfRow = matrix[0].length;
        var result = Array.from(new Array(lengthOfRow), () => []);
        matrix.forEach((row) => {
            [...row].forEach((element, i) => result[i].push(element));
        });
        return result;
    }

}

export default BaseDay