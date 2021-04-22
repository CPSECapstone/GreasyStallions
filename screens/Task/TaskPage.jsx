import { Button, ButtonGroup, Pagination } from 'react-bootstrap';
import React from 'react';
import { View } from 'react-native';
import QuizTask from './QuizTask';
import VideoTask from './VideoTask';
import WebpageTask from './WebpageTask';
import FreeResponseTask from './FreeResponseTask';
import RubricModal from './RubricModal';
import TextPageTask from './TextPageTask';

/**
 * The general task page that will hold all components that define a task
 * This page displayed general information about the task and has a slot for 
 * a component that is the task item itself
 */

let TaskPage = ({ navigation }) => {
    const [taskNum, setTaskNum] = React.useState(1);
    const [showRubricModal, setShowRubricModal] = React.useState(false);

    let genTask;
    let showRubric = false; // whether or not rubric button is active
    let rubric; // rubric object to be filled
    let navBarItems = [];

    let changeTaskNum = (type) => {
        if (type === "+") {
            if  (taskNum < task.length - 1) {
               setTaskNum(taskNum + 1);
            }
         }
   
         if (type === "-" && taskNum != 1) {
            setTaskNum(taskNum - 1);
         }
    }
    
    const task = [
        {
            task_title: "Task #1",
            task_count: 5,
            task_points: 20,
            task_type: "rubric",
            task_info: "Today we are going to be watching a short video followed by a quiz and finally have a few free response questions"
        },
        {
            task_title: "Week 1 General information",
            task_type: "text",
            task_text: "Hey class here is some information about what we are going to be \n" +
             "doing in the coming week..."
        },
        {
            task_title: "Video for chapter 1",
            task_type: "video",
            task_video: "https://www.youtube.com/embed/TUZ_T_Rfios"
        },
        {
            task_title: "Follow up questions for video",
            task_type: "quiz",
            task_questions: ["ques 1", " test 2", "test 3 question"],
            task_options: [["option 1", "option 2"], ["option 1", "option 2", "option 3"],
            ["option 1", "option 2", "option 3", "option 4"]],
            task_answers: ["option 2", "option 3", "option 4"]
        },
        {
            task_title: "Read the following article",
            task_num: 3,
            task_type: "webpage",
            task_webpage: "https://en.wikipedia.org/wiki/Earth"
        },
        {
            task_title: "Read and respond to the following question",
            task_num: 4,
            task_type: "free response",
            task_question: "Please describe the meaning of life below:"
        }
    ];


    // look through task to find rubric, if its there enable rubric button
    let findRubric = (tasks) => {
        for (let task of tasks) {
            if (task.task_type === "rubric") {
                rubric = {
                    task_title: task.task_title,
                    task_count: task.task_count,
                    task_points: task.task_points,
                    task_type: task.task_type,
                    task_info: task.task_info
                }
                showRubric = true;
            }
        }
    }


    // fill out the nav bar for the task
    for (let number = 1; number < task.length; number++) {
        navBarItems.push(
            <Pagination.Item key={number} onClick={() => setTaskNum(number)}>
                {task[number].task_title}
            </Pagination.Item>
        )
    }

    if (task[taskNum].task_type === "video") {
        genTask = <VideoTask id={task[taskNum].task_video}/>
    } else if  (task[taskNum].task_type === "quiz") {
        genTask = <QuizTask questions={task[taskNum].task_questions}
         options={task[taskNum].task_options}
         answers={task[taskNum].answers}/>
    } else if (task[taskNum].task_type === "text") {
        genTask = <TextPageTask text={task[taskNum].task_text}/>
    } else if (task[taskNum].task_type == "webpage") {
        genTask = <WebpageTask webpageUrl={task[taskNum].task_webpage}/>
    } else if (task[taskNum].task_type == "free response") {
        genTask = <FreeResponseTask freeResponseQuestion={task[taskNum].task_question}/>
    }

    return (
        <View>
            {findRubric(task)}
            <Pagination>{navBarItems}</Pagination>
            <Button disabled={showRubricModal} variant="primary" onClick={() => setShowRubricModal(true)}>Rubric</Button>
            <h2>{taskNum + "/" + (task.length - 1) + ": " + task[taskNum].task_title}</h2>
            {genTask}
            <ButtonGroup size="lg" classname="navbuts">
                <Button 
                 variant="primary" 
                 onClick={() => changeTaskNum("-")}
                 disabled={!(taskNum != 1)}
                >
                    Prev
                </Button>
                {(taskNum === (task.length-1)) ? 
                <Button  variant="primary" onClick={() => changeTaskNum("+")}>
                    Submit
                </Button> : 
                <Button variant="primary" onClick={() => changeTaskNum("+")}>
                    Next
                </Button>}
            </ButtonGroup>
            <RubricModal 
             show={showRubricModal}
             close={() => setShowRubricModal(false)}
             title={rubric.task_title}
             points={rubric.task_points}
             count={rubric.task_count}
             info={rubric.task_info}
            />
        </View>
    );
}

export default TaskPage;