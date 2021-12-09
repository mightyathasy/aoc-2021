import './App.css';
import { useState } from 'react';

import { Form } from 'react-bootstrap';

import MyForm from './components/MyForm';
import DayFactory from './DayFactory';

function App() {
  const [puzzleResult, setPuzzleResult] = useState(""); 
  const [day, setDay] = useState("");
  const [puzzle, setPuzzle] = useState("");

  const dayFacotry = new DayFactory();

  const runScript = (input) => {
    var reader = new FileReader();
    reader.onload = (e) => {
      var myDay = dayFacotry.getDay(day, puzzle);
      setPuzzleResult(myDay.execute(e.target.result));
    }
    reader.readAsText(input);
  }

  return (
    <div className='app'>
      <MyForm day={day} puzzle={puzzle} setDay={setDay} setPuzzle={setPuzzle} runScript={runScript}/>
      <Form>
        <Form.Group>
          <Form.Control type="text" defaultValue={puzzleResult}/>
        </Form.Group>
      </Form>
    </div>
  );
}

export default App;
