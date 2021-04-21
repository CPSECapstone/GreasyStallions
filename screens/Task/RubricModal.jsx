import React from 'react';
import { Modal } from 'react-bootstrap';

/*
 A modal that is always available to students so that they can see that task 
 assignment.
*/
let RubricModal = function({show, close, points, title, count, info}) {

    return (
        <Modal size="lg" show={show} onHide={close} >
            <Modal.Header closeButton>
                <Modal.Title>
                    Rubric
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1>{title}</h1>
                <h2>{"Problems: " + count + " Total Points: " + points}</h2>
                <p>{info}</p>
            </Modal.Body>
        </Modal>
    );
}

export default RubricModal;