import { useState } from 'react';
import { Col, Form } from 'react-bootstrap';

const MyForm = ({ runScript }) => {
    const [day, setDay] = useState("");
    const [puzzle, setPuzzle] = useState("");

    const handleFile = (e) => {
        setDay(e.target.value.split("_")[1]);
        setPuzzle(e.target.value.split("_")[2].split(".")[0]);

        runScript(e.target.files[0]);
        e.target.value = null;
    }

    return <Form className='my-form'>
        <Form.Group>
            <Form.Label column className='input-label'>
                Input name format: "input_#day_#puzzle.txt". Selected Day: {day}, Puzzle: {puzzle}
            </Form.Label>
            <Col sm='10'>
               <Form.Control className='input' type="file" onChange={handleFile} />
            </Col>
        </Form.Group>
    </Form>
}

export default MyForm;