class BaseDay {

    constructor () { }

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