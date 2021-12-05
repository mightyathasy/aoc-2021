import BaseDay from "./BaseDay";

class Day4 extends BaseDay {

    constructor(puzzle) {
        super();
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

    _executePuzzle1 = (input) => {
        // What will your final score be if you choose that board?
        var numbers = input.split("\n")[0].split(",").map(n => parseInt(n));
        var matrices = this._getMatrices(input);
        var result;
        
        numbers.some(currentNumber => {
            matrices.some(currentMatrix => {
                var checkResult = this._markNumbersInMatrix(currentNumber, currentMatrix);
                
                if(checkResult.winner) {
                    result = checkResult.sum * currentNumber;
                    return true;
                }
                return false;
            })
            if(result) { return true; }
            return false;
        })

        return result;
    }

    _executePuzzle2 = (input) => {
        // Figure out which board will win last. Once it wins, what would its final score be?
        var numbers = input.split("\n")[0].split(",").map(n => parseInt(n));
        var matrices = this._getMatrices(input);
        var matrixWinsAt = [];
        var lastMatrixToWin;

        matrices.forEach(currentMatrix => {
            numbers.some((currentNumber, index) => {
                var checkResult = this._markNumbersInMatrix(currentNumber, currentMatrix);

                if(checkResult.winner) {
                    matrixWinsAt.push({ 
                        matrix: currentMatrix, 
                        winsAt: index,
                        winResult: checkResult.sum * currentNumber
                    });
                    return true;
                }
            })
        })

        var latestWinner = { winsAt: 0 };
        matrixWinsAt.forEach(matrixDetails => {
            if(matrixDetails.winsAt > latestWinner.winsAt) {
                latestWinner = matrixDetails;
            }
        })

        return latestWinner.winResult;
    }

    _getMatrices = (input) => {
        var rows = input.split("\n");
        var matrices = [];

        for(var i = 2; i < rows.length; i++) {
            var matrix = [];
            for(var j = 0; j < 5; j++) {
                matrix[j] = rows[i].trim().replace(/ +/g, ' ').split(" ").map(n => { return { value: parseInt(n), marked: "" } });
                i++;
            }
            matrices.push(matrix);
        }

        return matrices;
    }

    _markNumbersInMatrix = (numberDrawn, matrix) => {
        matrix.forEach(row => {
            row.forEach(number => {
                if(number.value === numberDrawn) {
                    number.marked = "X";
                }
            })
        })

        return this._checkBingo(matrix);
    }

    _checkBingo = (matrix) => {
        var checkResult = { winner: false, sum: 0 };

        matrix.forEach(row => {
            var marked = 0;

            row.forEach(number => {
                if(number.marked) marked++;
            })

            if(marked === row.length) checkResult.winner = true;
        })

        var transposedMatrix = this._transposeMatrix(matrix);
        transposedMatrix.forEach(row => {
            var marked = 0;

            row.forEach(number => {
                if(number.marked) marked++;
            })

            if(marked === row.length) checkResult.winner = true;
        })

        if(checkResult.winner) {
            matrix.forEach(row => {
                row.forEach(number => {
                    if(!number.marked) checkResult.sum += number.value;
                })
            })
        }

        return checkResult;
    }

}

export default Day4