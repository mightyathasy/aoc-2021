import BaseDay from "./BaseDay";

class Day8 extends BaseDay {
    
    _executePuzzle1 = (input) => {
        // In the output values, how many times do digits 1, 4, 7, or 8 appear?
        var rows = input.split("\n");
        var output = [];
        rows.forEach(row => {
            if(row !== "") output = output.concat(row.split("|").map(elem => elem.trim())[1].split(" "));
        })
        var counter = this._countAppereancesOfNumbers(output);

        return counter[1] + counter[4] + counter[7] + counter[8];
    }

    _executePuzzle2 = (input) => {
        // What do you get if you add up all of the output values?
        var rows = input.trim().split("\n");
        var inputs = [];
        var outputs = [];
        var result = 0;

        rows.forEach((row, i) => {
            inputs[i] = row.split("|").map(elem => elem.trim())[0].split(" ");
            outputs[i] = row.split("|").map(elem => elem.trim())[1].split(" ");
        })

        inputs.forEach((input, i) => {
            var mapOfDigits = this._getMapOfDigits(input);
            var outputValue = this._getOutputValue(mapOfDigits, outputs[i]);
            
            result += outputValue;
        })

        return result;
    }

    _countAppereancesOfNumbers = (aInputNumberStrings) => {
        var digitCounter = { "0": 0, "1":0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 };

        aInputNumberStrings.forEach((inputDigit, i) => {
            digitCounter[this._getNumberByLength(inputDigit)]++;
        })

        return digitCounter;
    }

    _getNumberByLength = (inputDigit) => {
        switch(inputDigit.length) {
            case 2:
                return 1;
            case 4:
                return 4;
            case 3:
                return 7;
            case 7:
                return 8;
            default: return;
        }
    }

    _getMapOfDigits = (inputs) => {
        var mapOfDigits = {};

        // Get the unique length digits (1,4,7,8)
        inputs.forEach(inputDigit => {

            var digit = this._getNumberByLength(inputDigit);

            if(digit) {
                mapOfDigits[digit] = inputDigit;
            }

        })
        
        var sixLengthDigits = inputs.filter(inputDigit => inputDigit.length === 6);
        // 9 contains a 4, so get 9
        this._getDigit(mapOfDigits, sixLengthDigits, 9, 4);
        // 0 contains a 7, so get 0
        this._getDigit(mapOfDigits, sixLengthDigits, 0, 7);
        // 6 is the only 6-length digit left
        mapOfDigits[6] = sixLengthDigits[0];

        var fiveLengthDigits = inputs.filter(inputDigit => inputDigit.length === 5);
        // 3 contains a 1, so get 3
        this._getDigit(mapOfDigits, fiveLengthDigits, 3, 1);

        // 6 contains a 5, so get 5. Since 2 digits are left, the other one will be the 2
        fiveLengthDigits.forEach(inputDigit => {
            var sixContainsThis = !inputDigit.split("").some(c => mapOfDigits[6].indexOf(c) === -1);
            if(sixContainsThis) {
                mapOfDigits[5] = inputDigit;
            } else {
                mapOfDigits[2] = inputDigit;
            }
        })

        return mapOfDigits;
    }

    _getDigit = (mapOfDigits, givenLengthDigits, digitToLookFor, digitToContain) => {
        var foundDigit;
        givenLengthDigits.some(inputDigit => {
            var containsDigit = !mapOfDigits[digitToContain].split("").some(c => inputDigit.indexOf(c) === -1);
            if(containsDigit) {
                mapOfDigits[digitToLookFor] = inputDigit;
                foundDigit = inputDigit;
                return true;
            }
        })
        givenLengthDigits.splice(givenLengthDigits.indexOf(foundDigit), 1);
    }

    _getOutputValue = (mapOfDigits, outputs) => {
        var sOutputValue = "";
        outputs.forEach(output => {
            for(var i = 0; i < 10; i++) {
                if(mapOfDigits[i].length === output.length
                    && mapOfDigits[i].split("").sort().join("") === output.split("").sort().join("")) {
                    sOutputValue += i;
                }
            }
        })
        return parseInt(sOutputValue);
    }

}

export default Day8