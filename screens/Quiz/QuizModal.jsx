import React from 'react';
import { Button, Modal} from 'react-bootstrap';

let QuizModal = function({show, close, save}) {
  return (
    <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>By confirming you are submitting your quiz and will not be able to revise your answers.</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={close}>
            Return
            </Button>
            <Button variant="primary" onClick={save}>
            Submit Quiz
            </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default QuizModal;