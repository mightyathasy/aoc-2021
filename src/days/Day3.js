class Day3 {

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

    _executePuzzle1 = (input) => {
        // What is the power consumption of the submarine?
        var measurements = input.split("\n");
        measurements = this._transpose(measurements);
        var gamma = "";
        var epsilon = "";

        measurements.forEach((row, index) => {
            var zeroCnt = 0;
            var oneCnt = 0;
            [...row].forEach(c => {
                if(c === '0') { zeroCnt++; }
                if(c === '1') { oneCnt++; }
            });

            if( zeroCnt > oneCnt) { gamma += "0"; epsilon += "1"}
            if( zeroCnt < oneCnt) { gamma += "1"; epsilon += "0"}
        })

        return parseInt(gamma, 2) * parseInt(epsilon, 2);
    }

    _executePuzzle2 = (input) => {
        // What is the life support rating of the submarine?
        var values = input.split("\n");

        var fnMostCommonCriteria = (iZeroCnt, iOneCnt) => {
            if( iZeroCnt > iOneCnt ) { return '0'; }
            if( iZeroCnt < iOneCnt ) { return '1'; }
            if( iZeroCnt === iOneCnt ) { return '1'; }
        }

        var fnLeastCommonCriteria = (iZeroCnt, iOneCnt) => {
            if( iZeroCnt > iOneCnt ) { return '1'; }
            if( iZeroCnt < iOneCnt ) { return '0'; }
            if( iZeroCnt === iOneCnt ) { return '0'; }
        }

        var oxygenGeneratorValue = this._getElementByCriteria(values, fnMostCommonCriteria);
        var co2ScrubberRating = this._getElementByCriteria(values, fnLeastCommonCriteria);

        return parseInt(oxygenGeneratorValue, 2) * parseInt(co2ScrubberRating, 2);
    }

    // Transpose an array of strings. Every row of the input is to have the same length.
    _transpose = (measurements) => {
        var lengthOfRow = measurements[0].length;
        var result = Array.from(new Array(lengthOfRow), () => "");
        measurements.forEach((row) => {
            [...row].forEach((c, i) => result[i] += c);
        });
        return result;
    }

    // Inputs:
    //      - array of binaries with the same length
    //      - a function returning a bit character ('0' or '1') from the count of the 0s and 1s in the bit position of the values
    // Output:
    //      Only one value based on the criteria function
    _getElementByCriteria = (aValues, fnCriteria) => {
        var aElements = [...aValues];
        var lengthOfAValue = aElements[0].length;
        var i = 0;
        while(aElements.length > 1 && i <= lengthOfAValue) {
            var currentTransposedRow = this._transpose(aElements)[i];
            var criteriaBit;
            
            var zeroCnt = 0;
            var oneCnt = 0;
            for(let index = 0; index < [...currentTransposedRow].length; index++) {
                if([...currentTransposedRow][index] === '0') { zeroCnt++; }
                if([...currentTransposedRow][index] === '1') { oneCnt++; }
            }

            criteriaBit = fnCriteria(zeroCnt, oneCnt);

            aElements = aElements.filter( v => v[i] === criteriaBit );
            i++;
        }

        return aElements;
    }
}

export default Day3