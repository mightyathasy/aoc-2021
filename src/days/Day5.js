import BaseDay from "./BaseDay";

class Day5 extends BaseDay {
    
    _executePuzzle1 = (input) => {
        // Consider only horizontal and vertical lines. At how many points do at least two lines overlap?
        var lines = this._getInputLines(input);

        var map = Array.from(Array(1000), () => Array.from(Array(1000), () => 0));
        map = this._markHorizontalAndVertical(lines, map);

        return this._countDangerousPoints(map);
    }

    _executePuzzle2 = (input) => {
        // Consider all of the lines. At how many points do at least two lines overlap?
        var lines = this._getInputLines(input);

        var map = Array.from(Array(1000), () => Array.from(Array(1000), () => 0));
        map = this._markHorizontalAndVertical(lines, map);
        map = this._markDiagonal(lines, map);

        return this._countDangerousPoints(map);
    }

    _getInputLines = (rawInput) => {
        return rawInput.trim().split("\n").map(line => {
            var endPoints = line.split(" -> ");
            var x1 = parseInt(endPoints[0].split(",")[0]);
            var y1 = parseInt(endPoints[0].split(",")[1]);
            var x2 = parseInt(endPoints[1].split(",")[0]);
            var y2 = parseInt(endPoints[1].split(",")[1]);

            return { x1: x1, y1: y1, x2: x2, y2: y2 }
        })
    }

    _markHorizontalAndVertical = (input, map) => {
        var lines = input.filter(line => line.x1 === line.x2 || line.y1 === line.y2);

        lines.forEach(currentLine => {
            var from, to;
            if(currentLine.x1 === currentLine.x2) {
                from = currentLine.y1 < currentLine.y2 ? currentLine.y1 : currentLine.y2;
                to = currentLine.y1 > currentLine.y2 ? currentLine.y1 : currentLine.y2;

                for(var y = from; y <=to; y++) {
                    map[y][currentLine.x1]++;
                }
                return;
            }

            if(currentLine.y1 === currentLine.y2) {
                from = currentLine.x1 < currentLine.x2 ? currentLine.x1 : currentLine.x2;
                to = currentLine.x1 > currentLine.x2 ? currentLine.x1 : currentLine.x2;

                for(var x = from; x <=to; x++) {
                    map[currentLine.y1][x]++;
                }
                return;
            }
        });

        return map;
    }

    _markDiagonal = (input, map) => {
        var lines = input.filter(line => line.x1 !== line.x2 && line.y1 !== line.y2);

        lines.forEach(currentLine => {
            var from, to, x, y;
            if(currentLine.y1 < currentLine.y2 && currentLine.x1 < currentLine.x2) {
                from = { y: currentLine.y1, x: currentLine.x1 };
                to = { y: currentLine.y2, x: currentLine.x2 };
            }

            if(currentLine.y1 > currentLine.y2 && currentLine.x1 > currentLine.x2) {
                from = { y: currentLine.y2, x: currentLine.x2 };
                to = { y: currentLine.y1, x: currentLine.x1 };
            }
            
            if(from && to) {
                // Top-left to bottom-right found
                y = from.y;
                x = from.x;
                while(y <= to.y && x <= to.x) {
                    map[y][x]++;
                    y++;
                    x++;
                }
                return;
            }

            
            if(currentLine.y1 < currentLine.y2 && currentLine.x1 > currentLine.x2) {
                from = { y: currentLine.y1, x: currentLine.x1 };
                to = { y: currentLine.y2, x: currentLine.x2 };
            }

            if(currentLine.y1 > currentLine.y2 && currentLine.x1 < currentLine.x2) {
                from = { y: currentLine.y2, x: currentLine.x2 };
                to = { y: currentLine.y1, x: currentLine.x1 };
            }

            if(from && to) {
                // Top-right to bottom-left found
                y = from.y;
                x = from.x;
                while(y <= to.y && x >= to.x) {
                    map[y][x]++;
                    y++;
                    x--;
                }
                return;
            }
        })

        return map;
    }

    _countDangerousPoints = (map) => {
        var twoAtLeast = 0;
        var mapString = "";
        map.forEach(row => {
            row.forEach(column => {
                if (column > 1) twoAtLeast++;
                mapString += column;
            })
            mapString += "\n";
        })

        console.log(mapString);

        return twoAtLeast;
    }

}

export default Day5