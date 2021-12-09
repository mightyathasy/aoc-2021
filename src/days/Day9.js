import BaseDay from "./BaseDay";

class Day9 extends BaseDay {
    
    _executePuzzle1 = (input) => {
        //What is the sum of the risk levels of all low points on your heightmap?
        var heightMap = [];
        heightMap = input.trim().split("\n").map(row => row.trim().split("").map(sNumber => parseInt(sNumber)));

        var result = 0;

        for(let i = 0; i < heightMap.length; i++) {
            for(let j = 0; j < heightMap[i].length; j++) {
                const currentHeight = heightMap[i][j];
                
                const left = ( heightMap[i][j-1] || heightMap[i][j-1] === 0 ) ? heightMap[i][j-1] : 10; 
                const top = heightMap[i-1] ? heightMap[i-1][j] : 10;
                const right = ( heightMap[i][j+1] || heightMap[i][j+1] === 0 ) ? heightMap[i][j+1] : 10;
                const bottom = heightMap[i+1] ? heightMap[i+1][j] : 10;
                
                if(currentHeight < left && currentHeight < top && currentHeight < right && currentHeight < bottom) {
                    result += currentHeight + 1;
                }
            }
        }

        return result;
    }

    _executePuzzle2 = (input) => {
        // What do you get if you multiply together the sizes of the three largest basins?
        var heightMap = [];
        heightMap = input.trim().split("\n").map(row => row.trim().split("").map(sNumber => { return {"h": parseInt(sNumber), visited: false }; }));

        var basinSizeStore = [];

        for(let i = 0; i < heightMap.length; i++) {
            for(let j = 0; j < heightMap[i].length; j++) {
                const currentHeight = heightMap[i][j].h;
                
                const left = heightMap[i][j-1] ? heightMap[i][j-1] : { "h": 10}; 
                const top = heightMap[i-1] ? heightMap[i-1][j] : { "h": 10};
                const right = heightMap[i][j+1]  ? heightMap[i][j+1] : { "h": 10};
                const bottom = heightMap[i+1] ? heightMap[i+1][j] : { "h": 10};
                
                if(currentHeight < left.h && currentHeight < top.h && currentHeight < right.h && currentHeight < bottom.h) {
                    basinSizeStore.push(this._discoverAdjacent(heightMap, i, j));
                }
            }
        }

        basinSizeStore.sort((a,b) => a-b).reverse();

        return basinSizeStore[0] * basinSizeStore[1] * basinSizeStore[2];
    }

    _discoverAdjacent = (heightMap, currentI, currentJ) => {
        const i = currentI; const j = currentJ;
        if(!heightMap[i][j]) return 0;

        const currentHeight = heightMap[i][j].h; const currentVisited = heightMap[i][j].visited;
        if(currentHeight === 9 || currentVisited) {
            return 0;
        }

        heightMap[i][j].visited = true;
        var leftBasinSize = 0; var topBasinSize = 0; var rightBasinSize = 0; var bottomBasinSize = 0;

        const left = heightMap[i][j-1] ? heightMap[i][j-1] : { "h": 10 }; 
        const top = heightMap[i-1] ? heightMap[i-1][j] : { "h": 10 };
        const right = heightMap[i][j+1]  ? heightMap[i][j+1] : { "h": 10 };
        const bottom = heightMap[i+1] ? heightMap[i+1][j] : { "h": 10 };

        if(left.h >= currentHeight && left.h < 9 && !left.visited) {
            leftBasinSize = this._discoverAdjacent(heightMap, i, j-1);
        }
        if(top.h >= currentHeight && top.h < 9 && !top.visited) {
            topBasinSize = this._discoverAdjacent(heightMap, i-1, j);
        }
        if(right.h >= currentHeight && right.h < 9 && !right.visited) {
            rightBasinSize = this._discoverAdjacent(heightMap, i, j+1);
        }
        if(bottom.h >= currentHeight && bottom.h < 9 && !bottom.visited) {
            bottomBasinSize = this._discoverAdjacent(heightMap, i+1, j);
        }

        return 1 + leftBasinSize + topBasinSize + rightBasinSize + bottomBasinSize;
    }

}

export default Day9