import Day1 from './days/Day1';
import Day2 from './days/Day2';
import Day3 from './days/Day3';
import Day4 from './days/Day4';
import Day5 from './days/Day5';
import Day6 from './days/Day6';
import Day7 from './days/Day7';
import Day8 from './days/Day8';
import Day9 from './days/Day9';

class DayFactory {

    getDay = (day, puzzleNumber) => {
        switch(day) {
          case 1: 
            return new Day1(puzzleNumber);
          case 2: 
            return new Day2(puzzleNumber);
          case 3: 
            return new Day3(puzzleNumber);
          case 4: 
            return new Day4(puzzleNumber);
          case 5: 
            return new Day5(puzzleNumber);
          case 6: 
            return new Day6(puzzleNumber);
          case 7: 
            return new Day7(puzzleNumber);
          case 8: 
            return new Day8(puzzleNumber);
          case 9: 
            return new Day9(puzzleNumber);
          default: 
            console.log("Invalid day.");
            return null;
        }
    }
    
}

export default DayFactory