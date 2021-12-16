import BaseDay from "./BaseDay";

class Day14 extends BaseDay {

    _polymerTemplate
    _insertionRules
    _rulesUsed
    _charPairs
    _charCounters

    _executePuzzle1 = (input) => {
        // Apply 10 steps of pair insertion to the polymer template and find the most and least common elements in the result.
        // What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?
        return this._makePolymer(input, 10);
    }

    _executePuzzle2 = (input) => {
        // Apply 40 steps of pair insertion to the polymer template and find the most and least common elements in the result. 
        // What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?
        return this._makePolymer(input, 40);
    }

    _makePolymer = (input, iStepCount) => {
        this._insertionRules = [];
        input.trim().split("\n").forEach((line, index) => {
            if(index === 0) {
                this._polymerTemplate = line;
                return;
            }

            if(line !== "") {
                this._insertionRules.push({
                    pair: line.split("->")[0].trim(),
                    toAdd: [ line.split("->")[0].trim()[0] + line.split("->")[1].trim(), line.split("->")[1].trim() + line.split("->")[0].trim()[1] ]
                });
            }
        })

        this._setupCharCounters();
        this._setupCharPairs();
        
        this._charPairs.forEach(pair => {
            for(let i = 0; i < this._polymerTemplate.length-1; i++) {
                if((this._polymerTemplate.charAt(i) + this._polymerTemplate.charAt(i+1)) === pair.pair) {
                    pair.counter += 1;
                }
            }
        })
        
        for(let step = 1; step <= iStepCount; step++) {
            this._applyRules();
        }
        
        return this._calculateResult();
    }

    _setupCharPairs = () => {
        this._charPairs = [];
        for(let i = 65; i <= 90; i++) {
            for(let j = 65; j <= 90; j++) {
                this._charPairs.push({
                    pair: String.fromCharCode(i) + String.fromCharCode(j),
                    counter: 0
                });
            }
        }
    }

    _setupCharCounters = () => {
        this._charCounters = {};
        for(let i = 65; i <= 90; i++) {
            this._charCounters[String.fromCharCode(i)] = [...this._polymerTemplate.matchAll(String.fromCharCode(i), "g")].length;
        }
    }

    _calculateResult = () => {
        return Math.max(...Object.values(this._charCounters)) - Math.min(...Object.values(this._charCounters).filter(v => v > 0));
    }

    _applyRules = () => {
        var rulesToApply = [];
        this._charPairs.forEach((currentPair, index, pairs) => {
            if(currentPair.counter > 0) {
                rulesToApply.push({
                    rule: this._insertionRules.filter(rule => rule.pair === currentPair.pair)[0],
                    toApplyCounter: currentPair.counter
                });
            }
        })
        
        rulesToApply.forEach(ruleToApply => {
            this._charCounters[ruleToApply.rule.toAdd[0].charAt(1)] += ruleToApply.toApplyCounter;
            this._charPairs.forEach(pair => {
                if (pair.pair === ruleToApply.rule.toAdd[0] || pair.pair === ruleToApply.rule.toAdd[1]) {
                    pair.counter += ruleToApply.toApplyCounter;
                }
                if (pair.pair === ruleToApply.rule.pair) {
                    pair.counter -= ruleToApply.toApplyCounter;
                }
            })
        })
    }
}

export default Day14