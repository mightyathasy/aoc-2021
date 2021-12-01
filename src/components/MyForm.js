import { Col, Form } from 'react-bootstrap';

const MyForm = ({ runScript }) => {

    const handleFile = (e) => {
        runScript(e.target.files[0]);
    }

    return <Form className='my-form'>
        <Form.Group>
            <Form.Label column className='input-label'>
                Input name format: "input_#day_#puzzle.txt"
            </Form.Label>
            <Col sm='10'>
               <Form.Control className='input' type="file" onChange={handleFile} />
            </Col>
        </Form.Group>
    </Form>
}

export default MyForm;