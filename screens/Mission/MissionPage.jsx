import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Alert, ListGroup, Button, Col, Row, Card, Accordion} from 'react-bootstrap'

let MissionPage = function({ route, navigation}){

    const { quizzes } = route.params
    let names = ["Mission 1", "Mission 2", "Mission 3"];

    return (
        <View>
            <h2>{"Missions"}</h2>
            <ListGroup.Item>
                <Accordion defaultActiveKey="0">
                    <Card>
                    <Card.Header>
                        <Row>
                            <Col sm={2}>
                                <Accordion.Toggle
                                as={Button}
                                variant="link"
                                eventKey="0">
                                Show/Hide Relevant Tasks
                                </Accordion.Toggle>
                            </Col>
                            <Col sm={3}>
                                {names[0]}
                            </Col>
                            <Col sm={4}></Col>
                            <Col sm={2}></Col>
                        </Row>
                        <Row>
                            <Col sm={2}></Col>
                            <Col sm={3}></Col>
                            <Col sm={7}></Col>
                        </Row>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <ListGroup>
                                {quizzes}
                            </ListGroup>
                        </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                </Accordion>
            </ListGroup.Item>;
        </View>
    );
}

export default MissionPage;