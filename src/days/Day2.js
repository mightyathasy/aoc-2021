class Day2 {

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
        // What do you get if you multiply your final horizontal position by your final depth?
        var movements = [];
        input.split("\n").forEach(m => {
            var move = m.split(" ");
            if(move[0]) {
                movements.push({
                    "direction": move[0],
                    "value": parseInt(move[1])
                });
            }
        });
        var horizontalPos = 0;
        var depthPos = 0;
        
        movements.forEach(movement => {
            switch(movement.direction) {
                case "forward":
                    horizontalPos += movement.value;
                    break;
                case "up":
                    depthPos -= movement.value;
                    break;
                case "down": 
                    depthPos += movement.value;
                    break;
                default:
                    alert("Illegal move detected!");
                    break;
            }
        });

        return horizontalPos * depthPos;
    }

    _executePuzzle2 = (input) => {
        // What do you get if you multiply your final horizontal position by your final depth?
        var movements = [];
        input.split("\n").forEach(m => {
            var move = m.split(" ");
            if(move[0]) {
                movements.push({
                    "direction": move[0],
                    "value": parseInt(move[1])
                });
            }
        });
        var horizontalPos = 0;
        var depthPos = 0;
        var aim = 0;
        
        movements.forEach(movement => {
            switch(movement.direction) {
                case "forward":
                    horizontalPos += movement.value;
                    depthPos += aim * movement.value;
                    break;
                case "up":
                    aim -= movement.value;
                    break;
                case "down": 
                    aim += movement.value;
                    break;
                default:
                    alert("Illegal move detected!");
                    break;
            }
        });

        return horizontalPos * depthPos;
    }
}

export default Day2