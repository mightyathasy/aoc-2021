import BaseDay from "./BaseDay";

class Day7 extends BaseDay {
    
    _executePuzzle1 = (input) => {
        // How much fuel must they spend to align to that position?

        var fnCalculateConsumptionForMove = (pos, crabPos) => {
            return Math.abs(pos - crabPos);
        }

        return this._getLowestFuelConsumption(input, fnCalculateConsumptionForMove);
    }

    _executePuzzle2 = (input) => {
        // How much fuel must they spend to align to that position?

        var fnCalculateConsumptionForMove = (pos, crabPos) => {
            var distance = Math.abs(pos - crabPos);
            var sum = 0;
            
            for(var i of Array(distance).fill().map((_, index) => index + 1)) {
                sum += i;
            }

            return sum;
        }

        return this._getLowestFuelConsumption(input, fnCalculateConsumptionForMove);
    }

    _getLowestFuelConsumption = (input, fnCalculateConsumptionForMove) => {
        var positions = input.split(",").map(pos => parseInt(pos));
        var max = Math.max(...positions);
        var min = Math.min(...positions);
        
        var positionForLowestFuel;

        for(var i = min; i <= max; i++) {
            var fuelConsumption = 0;
            positions.forEach(pos => {
                fuelConsumption += fnCalculateConsumptionForMove(i, pos);
            });

            if(!positionForLowestFuel) {
                positionForLowestFuel = {
                    fuelConsumption: fuelConsumption,
                    position: i
                };
            }

            if(fuelConsumption < positionForLowestFuel.fuelConsumption) {
                positionForLowestFuel = {
                    fuelConsumption: fuelConsumption,
                    position: i
                };
            }
        }

        return positionForLowestFuel.fuelConsumption;
    }

}

export default Day7