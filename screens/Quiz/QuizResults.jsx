import React from 'react';
import { View } from 'react-native';
import { Form, FormLabel, Col, Row } from 'react-bootstrap';

let QuizResults = function({ route, navigation }) {

    const { quiz, answers } = route.params;
    let i = 0;

    let colorCheck = (option, correct) => {
        if (option === correct) {
            return "btn btn-outline-success";
        } else {
            return "btn btn-outline-danger";
        }
    }

    let checkAnswer = (selected, actual) => {
        if (selected === actual) {
            return "green";
        } else {
            return "red";
        }
    }

    return (
        <View>
            <h2>Quiz #1 Results</h2>
            {quiz.map((question, idx) => (
                <Form>
                    <Form.Group>
                        <FormLabel>{question.num + ") " + question.text}</FormLabel>
                        <small color={checkAnswer(answers[i], question.answer)} class="form-text text-muted">{"You selected: " + answers[i++]}</small>
                    </Form.Group>
                    <Form.Group>
                        {question.options.map((prompt, jdx) => (
                            <button
                                type="button"
                                class={colorCheck(prompt, question.answer)}
                                disabled
                            >
                                {prompt}
                            </button>
                        ))}
                    </Form.Group>
                </Form>
            ))}
        </View>
    );
}

export default QuizResults;