import BaseDay from "./BaseDay";

class Day10 extends BaseDay {

    _chunks = {  }
    _opens = ["(", "[", "{", "<"]
    _closes = [")", "]", "}", ">"]

    _scoreMapPartOne = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137
    }
    _resultPartOne = 0
    
    _scoreMapPartTwo = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4
    }
    _resultsPartTwo = [];

    _executePuzzle1 = (input) => {
        // What is the total syntax error score for those errors?
        var lines = input.trim().split("\n").map(line => line.trim());

        lines.forEach((line) => {
            this._getIsCorrupted(line);
        });

        return this._resultPartOne;
    }

    _executePuzzle2 = (input) => {
        // Find the completion string for each incomplete line, score the completion strings, and sort the scores. What is the middle score?
        var lines = input.trim().split("\n").map(line => line.trim());

        lines.forEach((line) => {
            if(!this._getIsCorrupted(line)) {
                const completion = this._getCompletion(line);
                this._resultsPartTwo.push(this._calculatePartTwoResultForLine(completion));
            }
        });

        return this._resultsPartTwo.sort((a,b) => a-b)[(this._resultsPartTwo.length-1)/2];
    }

    _getIsCorrupted = (line) => {
        var openers = "";
        return line.split("").some(c => {
            if(this._opens.includes(c)) {
                openers += c;
            }
            if(this._closes.includes(c)) {
                var latestOpener = openers[openers.length-1];
                if(this._opens[this._closes.indexOf(c)] === latestOpener) {
                    openers = openers.slice(0, openers.length-1);
                } else {
                    // illegal closing found
                    console.log("Expected \"" + this._closes[this._opens.indexOf(c)] + "\", but found \"" + c + "\" instead.");
                    this._resultPartOne += this._scoreMapPartOne[c];
                    return true;
                }
            }
        });
    }

    _getCompletion = (line) => {
        var completion = "";
        var openers = "";
        line.split("").forEach(c => {
            if(this._opens.includes(c)) {
                openers += c;
            }
            if(this._closes.includes(c)) {
                var latestOpener = openers[openers.length-1];
                if(this._opens[this._closes.indexOf(c)] === latestOpener) {
                    openers = openers.slice(0, openers.length-1);
                }
            }
        })

        openers.split("").forEach(o => {
            completion = this._closes[this._opens.indexOf(o)] + completion;
        })

        return completion;
    }

    _calculatePartTwoResultForLine = (completion) => {
        var result = 0;
        completion.split("").forEach(c => {
            result = (result * 5) + this._scoreMapPartTwo[c];
        })
        return result;
    }
}

export default Day10