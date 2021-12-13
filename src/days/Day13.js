import BaseDay from "./BaseDay";

class Day13 extends BaseDay {

    _paper
    _coordinates
    _instructions
    
    _executePuzzle1 = (input) => {
        // How many dots are visible after completing just the first fold instruction on your transparent paper?
        this._coordinates = [];
        this._instructions = [];
        this._processInput(input);

        var maxX = 0, maxY = 0;
        this._coordinates.forEach(coordinate => {
            if(coordinate.x > maxX) maxX = coordinate.x;
            if(coordinate.y > maxY) maxY = coordinate.y;
        })

        this._fillPaperByCoordinates(maxX+1, maxY+1);

        this._foldPaper(this._instructions[0]);

        return this._getCountOfDotsOnPaper();
    }

    _executePuzzle2 = (input) => {
        // What code do you use to activate the infrared thermal imaging camera system?
        this._coordinates = [];
        this._instructions = [];
        this._processInput(input);

        var maxX = 0, maxY = 0;
        this._coordinates.forEach(coordinate => {
            if(coordinate.x > maxX) maxX = coordinate.x;
            if(coordinate.y > maxY) maxY = coordinate.y;
        })

        this._fillPaperByCoordinates(maxX+1, maxY+1);

        this._instructions.forEach(instruction => {
            this._foldPaper(instruction);
        })

        var codeString = "";
        this._paper.forEach(line => {
            line.forEach(spot => {
                codeString += spot;
            })
            codeString += "\n";
        })
        console.log(codeString);

        // The output is the following on the console for the input of Day 13:

        // .##....##.####..##..#....#..#.###....##.
        // #..#....#....#.#..#.#....#..#.#..#....#.
        // #.......#...#..#....#....#..#.#..#....#.
        // #.##....#..#...#.##.#....#..#.###.....#.
        // #..#.#..#.#....#..#.#....#..#.#....#..#.
        // .###..##..####..###.####..##..#.....##.. 

        // So the answer was "GJZGLUPJ"
    }

    _foldPaper = (instruction) => {
        var newCoordinates = [];
        this._coordinates.forEach(coordinate => {
            if(instruction.foldBy === "x" && coordinate.x < instruction.value) {
                newCoordinates.push(coordinate);
            }
            if(instruction.foldBy === "x" && coordinate.x >= instruction.value) {
                newCoordinates.push({
                    y: coordinate.y,
                    x: instruction.value - (coordinate.x - instruction.value)
                })
            }
            if(instruction.foldBy === "y" && coordinate.y < instruction.value) {
                newCoordinates.push(coordinate);
            }
            if(instruction.foldBy === "y" && coordinate.y >= instruction.value) {
                newCoordinates.push({
                    y: instruction.value - (coordinate.y - instruction.value),
                    x: coordinate.x
                })
            }
        })
        this._coordinates = newCoordinates;
        var newWidth = instruction.foldBy === "x" ? instruction.value : this._paper[0].length;
        var newHeight = instruction.foldBy === "y" ? instruction.value : this._paper.length;
        this._fillPaperByCoordinates(newWidth, newHeight);
    }

    _processInput = (input) => {
        input.trim().split("\n").forEach(line => {
            if(line.split(",").length > 1) {
                this._coordinates.push({
                    y: line.split(",").map(c => parseInt(c))[1],
                    x: line.split(",").map(c => parseInt(c))[0]
                });
            }

            if(line.indexOf("fold") > -1) {
                this._instructions.push({
                    "foldBy": line.split(" ")[2].split("=")[0],
                    "value": parseInt(line.split(" ")[2].split("=")[1])
                })
            }
        })
    }

    _fillPaperByCoordinates = (width, height) => {
        var paper = Array.from(Array(height), () => Array.from(Array(width), () => "."));

        this._coordinates.forEach(coordinate => {
            paper[coordinate.y][coordinate.x] = "#";
        })

        this._paper = paper;
    }

    _getCountOfDotsOnPaper = () => {
        var dotCount = 0;
        this._paper.forEach(line => {
            line.forEach(spot => {
                if(spot === "#") dotCount++;
            })
        })

        return dotCount;
    }
}

export default Day13