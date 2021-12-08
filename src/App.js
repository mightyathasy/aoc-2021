import './App.css';
import { useState } from 'react';

import { Form } from 'react-bootstrap';

import MyForm from './components/MyForm';

import Day1 from './days/Day1';
import Day2 from './days/Day2';
import Day3 from './days/Day3';
import Day4 from './days/Day4';
import Day5 from './days/Day5';
import Day6 from './days/Day6';
import Day7 from './days/Day7';
import Day8 from './days/Day8';

function App() {
  const [puzzleResult, setPuzzleResult] = useState(""); 

  const _getDay = (dayNumber, puzzleNumber) => {
    switch(dayNumber) {
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
      default: 
        console.log("Invalid day.");
        return null;
    }
  }

  const runScript = (input) => {
    var reader = new FileReader();
    var day = parseInt(input.name.split("_")[1]);
    var puzzle = parseInt(input.name.split("_")[2].split(".")[0]);
    reader.onload = (e) => {
      var myDay = _getDay(day, puzzle);
      setPuzzleResult(myDay.execute(e.target.result));
    }
    reader.readAsText(input);
  }

  return (
    <div className='app'>
      <MyForm runScript={runScript}/>
      <Form>
        <Form.Group>
          <Form.Control type="text" defaultValue={puzzleResult}/>
        </Form.Group>
      </Form>
    </div>
  );
}

export default App;
