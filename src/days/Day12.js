import BaseDay from "./BaseDay";

class Day12 extends BaseDay {

    _paths = []
    _links = []
    _validPaths = []
    
    _executePuzzle1 = (input) => {
        // How many paths through this cave system are there that visit small caves at most once?
        this._links = input.trim().split("\n").map(sLink => sLink.split("-"));
        this._paths = [];
        this._links.forEach(link => {
            if(link[0] === 'start') {
                this._paths.push([link[0], link[1]]);
            }
            if(link[1] === 'start') {
                this._paths.push([link[1], link[0]]);
            }
        })
        var numberOfValidPath = 0;

        var fnCaveToVisit = (cave, currentPath) => {
            return !this._isLowerCase(cave) || (this._isLowerCase(cave) && currentPath.indexOf(cave) < 0);
        }
        
        this._paths.forEach(path => {
            numberOfValidPath += this._findValidPaths(path, fnCaveToVisit);
        })
        
        return numberOfValidPath;
    }

    _executePuzzle2 = (input) => {
        // Given these new rules, how many paths through this cave system are there?
        this._links = input.trim().split("\n").map(sLink => sLink.split("-"));
        this._paths = [];
        this._links.forEach(link => {
            if(link[0] === 'start') {
                this._paths.push([link[0], link[1]]);
            }
            if(link[1] === 'start') {
                this._paths.push([link[1], link[0]]);
            }
        })
        var numberOfValidPath = 0;

        var fnCaveToVisit = (cave, currentPath) => {
            if(cave === "start") return false;
            if(!this._isLowerCase(cave)) return true;

            var smallCavesInPath = currentPath.filter(c => this._isLowerCase(c) && c !== "start");
            
            var hasDuplicateSmall = [...new Set(smallCavesInPath)].length !== smallCavesInPath.length;
            var occurencesOfCurrent = smallCavesInPath.filter(c => c === cave).length;

            if((hasDuplicateSmall && occurencesOfCurrent === 0) || (!hasDuplicateSmall && occurencesOfCurrent < 2)) {
                return true;
            }
            return false;
        }
        
        this._paths.forEach(path => {
            numberOfValidPath += this._findValidPaths(path, fnCaveToVisit);
        })

        return numberOfValidPath;
    }
    
    _findValidPaths = (path, fnCaveToVisit) => {
        var validPathsFound = 0;
        var lastCave = path[path.length-1];
        var cavesToVisit = [];

        this._links.forEach(link => {
            if(link[0] === lastCave && fnCaveToVisit(link[1], path)) cavesToVisit.push(link[1]);
            if(link[1] === lastCave && fnCaveToVisit(link[0], path)) cavesToVisit.push(link[0]);
        })

        validPathsFound += cavesToVisit.filter(cave => cave === "end").length;
        cavesToVisit = cavesToVisit.filter(cave => cave !== "end");

        var newPaths = cavesToVisit.map(caveToVisit => path.concat([caveToVisit]))

        newPaths.forEach(currentPath => {
            validPathsFound += this._findValidPaths(currentPath, fnCaveToVisit);
        })
        
        debugger;

        return validPathsFound;
    }

    _isLowerCase = (str) => {
        return /[a-z]/.test(str) && !/[A-Z]/.test(str);
    }
}

export default Day12