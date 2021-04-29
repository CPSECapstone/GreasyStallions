import React from 'react';
import { Col, Modal, Row } from 'react-bootstrap';

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
                <Row>
                    <Col sm="5">
                        <h1>{title}</h1>
                    </Col>
                    <Col sm="7">
                        <h2>{"Problems: " + count + " Total Points: " + points}</h2>
                    </Col>
                </Row>
                <p>{info}</p>
            </Modal.Body>
        </Modal>
    );
}

export default RubricModal;