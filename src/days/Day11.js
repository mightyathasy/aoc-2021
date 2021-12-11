import BaseDay from "./BaseDay";

class Day11 extends BaseDay {

    _energyMap = []
    _flashMap = Array.from(Array(10), () => Array.from(Array(10), () => 0));
    _flashCounter = 0

    _executePuzzle1 = (input) => {
        // Given the starting energy levels of the dumbo octopuses in your cavern, simulate 100 steps. How many total flashes are there after 100 steps?
        this._energyMap = input.trim().split("\n").map(line => line.trim().split("").map(energyLevel => parseInt(energyLevel)));

        for (let step = 0; step < 100; step++) {
            /* debugger; */
            this._takeStep();
        }
        return this._flashCounter;
    }

    _executePuzzle2 = (input) => {
        // If you can calculate the exact moments when the octopuses will all flash simultaneously, you should be able to navigate through the cavern. 
        // What is the first step during which all octopuses flash?
        this._energyMap = input.trim().split("\n").map(line => line.trim().split("").map(energyLevel => parseInt(energyLevel)));
        var flashedInStep = 0;
        var stepCounter = 0;
        while(flashedInStep !== 100) {
            flashedInStep = this._takeStep();
            stepCounter++;
        }
        return stepCounter;
    }

    _takeStep = () => {
        var flashedThisStep = 0;
        // Increase everyone
        for (let i = 0; i < this._energyMap.length; i++) {
            for (let j = 0; j < this._energyMap[i].length; j++) {
                this._energyMap[i][j]++
            }
        }

        // Disco incoming
        var someoneFlashed = true;
        while(someoneFlashed) {
            someoneFlashed = false;
            for (let i = 0; i < this._energyMap.length; i++) {
                for (let j = 0; j < this._energyMap[i].length; j++) {
                    if (this._energyMap[i][j] > 9 && !this._flashMap[i][j]) {
                        someoneFlashed = true;
                        this._flashMap[i][j]++;
                        this._increaseAdjacents(i, j);
                    }
                }
            }
        }

        // Reset the flashed ones to zero and count
        for (let i = 0; i < this._energyMap.length; i++) {
            for (let j = 0; j < this._energyMap[i].length; j++) {
                if (this._energyMap[i][j] > 9)  {
                    flashedThisStep++;
                    this._flashCounter++;
                    this._flashMap[i][j] = 0;
                    this._energyMap[i][j] = 0;
                }
            }
        }
        return flashedThisStep;
    }

    _increaseAdjacents = (i, j) => {
        if (i - 1 > -1) this._energyMap[i-1][j]++; 
        if (i + 1 < 10) this._energyMap[i+1][j]++;
        if (j - 1 > -1) this._energyMap[i][j-1]++;
        if (j + 1 < 10) this._energyMap[i][j+1]++;
        if (i - 1 > -1 && j - 1 > -1) this._energyMap[i-1][j-1]++;
        if (i - 1 > -1 && j + 1 < 10) this._energyMap[i-1][j+1]++;
        if (i + 1 < 10 && j - 1 > -1) this._energyMap[i+1][j-1]++;
        if (i + 1 < 10 && j + 1 < 10) this._energyMap[i+1][j+1]++;
    }
}

export default Day11