import BaseDay from "./BaseDay";

class Day6 extends BaseDay {
    
    _executePuzzle1 = (input) => {
        // How many lanternfish would there be after 80 days?
        return this._getCountOfFishesAfterGivenDay(input, 80);
    }

    _executePuzzle2 = (input) => {
        // How many lanternfish would there be after 256 days?
        return this._getCountOfFishesAfterGivenDay(input, 256);
    }

    _getCountOfFishesAfterGivenDay = (input, dayLimit) => {
        var fishes = input.split(",").map(timer => parseInt(timer));
        var catalogue = { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0 };
        fishes.forEach(fish => {
            catalogue[fish]++;
        })
        
        var i, j;
        for(i = 0; i <= dayLimit; i++) {
            var fishesToSpawn = catalogue["0"];

            for(j = 0; j < 8; j++) {
                catalogue[j] = catalogue[j+1];
            }

            catalogue["6"] += fishesToSpawn;
            catalogue["8"] = fishesToSpawn;
        }
        
        var fishCount = 0;
        for(i = 0; i < 8; i++) {
            fishCount += catalogue[i];
        }

        return fishCount;
    }

    /* _getCountOfFishesAfterGivenDayHugeMemory = (input, dayLimit) => {
        var fishes = input.split(",").map(timer => parseInt(timer));

        for(var day = 0; day < dayLimit; day++) {
            var fishesSpawnedToday = [];
            fishes = fishes.map(fish => {
                fish = fish - 1;

                if(fish === -1) {
                    fishesSpawnedToday.push(8);
                    fish = 6
                }
                return fish;
            })

            fishes = fishes.concat(fishesSpawnedToday);
        }
        
        return fishes.length;
    } */

}

export default Day6