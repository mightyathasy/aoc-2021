class Day1 {

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
        // How many measurements are larger than the previous measurement?
        var measurements = input.split("\n").map(m => parseInt(m));
        var increased = 0;
        measurements.forEach((measurement, index) => {
            if(index === 0) { return; }

            if(measurement > measurements[index-1]) { increased++; }
        })

        return increased;
    }

    _executePuzzle2 = (input) => {
        // How many sums are larger than the previous sum?
        var measurements = input.split("\n").map(m => parseInt(m));
        var increased = 0;
        var lastWindowSum = measurements[0] + measurements[1] + measurements[2];
        measurements.forEach((measurement, index) => {
            if(index < 3) { return; }
            
            var currentWindowSum = measurements[index-2] + measurements[index-1] + measurements[index];

            if(currentWindowSum > lastWindowSum) { increased++; }
            lastWindowSum = currentWindowSum;
        });

        return increased;
    }
}

export default Day1