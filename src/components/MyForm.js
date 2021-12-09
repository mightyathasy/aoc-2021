import { useState } from 'react';
import { Col, Form } from 'react-bootstrap';

const MyForm = ({ day, puzzle, setDay, setPuzzle, runScript }) => {

    const handleFile = (e) => {
        if(parseInt(e.target.value.split("_")[1].split(".")[0]) !== day) {
            alert("Day not specified or input does not belong to the selected day!");
            e.target.value = null;
            return;
        }
        
        runScript(e.target.files[0]);
        e.target.value = null;
    }

    return <Form className='my-form'>
        <Form.Group>
            <Col sm='10'>
                <Form.Label column className='input-label'>
                    Day: 
                </Form.Label>
               <Form.Control className='input' value={day} onChange={e => setDay(parseInt(e.target.value) ? parseInt(e.target.value) : "")} placeholder="Enter number of day"/>
               <Form.Label column className='input-label'>
                    Puzzle: 
                </Form.Label>
               <Form.Control className='input' value={puzzle} onChange={e => setPuzzle(parseInt(e.target.value) ? parseInt(e.target.value) : "")} placeholder="1 or 2"/>
            </Col>
            <Form.Label column className='input-label'>
                Inputs: 
            </Form.Label>
            <Col sm='10'>
               <Form.Control className='input' type="file" onChange={handleFile} placeholder="Select input file"/>
            </Col>
        </Form.Group>
    </Form>
}

export default MyForm;