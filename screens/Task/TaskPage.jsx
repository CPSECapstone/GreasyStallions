import { Form, Button, FormLabel, ButtonGroup, ToggleButton, Pagination } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import QuizTask from './QuizTask';
import VideoTask from './VideoTask';
import RubricModal from './RubricModal';


let TaskPage = ({ navigation }) =>{
    const [taskNum, setTaskNum] = React.useState(1);
    const [showRubric, setShowRubric] = React.useState(false);

    let genTask;
    let pageItems = [];

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
            task_title: "Video for chapter 1",
            task_num: 1,
            task_type: "video",
            task_video: "https://www.youtube.com/embed/TUZ_T_Rfios"
        },
        {
            task_title: "Follow up questions for video",
            task_num: 2,
            task_type: "quiz",
            task_questions: ["ques 1", " test 2", "test 3 question"],
            task_options: [["option 1", "option 2"], ["option 1", "option 2", "option 3"],
            ["option 1", "option 2", "option 3", "option 4"]],
            task_answers: ["option 2", "option 3", "option 4"]
        }
    ];


    for (let number = 1; number < task.length; number++) {
        pageItems.push(
            <Pagination.Item key={number} onClick={() => setTaskNum(number)}>
                {task[number].task_title}
            </Pagination.Item>
        )
    }

    if (task[taskNum].task_type == "video") {
        genTask = <VideoTask id={task[taskNum].task_video}/>
    } else if  (task[taskNum].task_type == "quiz") {
        genTask = <QuizTask questions={task[taskNum].task_questions}
         options={task[taskNum].task_options}
         answers={task[taskNum].answers}/>
    }

    return (
        <View>
            <Pagination>{pageItems}</Pagination>
            <Button variant="primary" onClick={() => setShowRubric(true)}>Rubric</Button>
            <h2>{task[taskNum].task_num + "/" + task.length + ": " + task[taskNum].  task_title}</h2>
            {genTask}
            <ButtonGroup size="lg" classname="navbuts">
                <Button variant="primary" onClick={() => changeTaskNum("-")}>Prev</Button>
                {(taskNum === (task.length - 1)) ? 
                <Button  variant="primary" onClick={() => changeTaskNum("+")}>
                    Submit
                </Button> : 
                <Button variant="primary" onClick={() => changeTaskNum("+")}>
                    Next
                </Button>}
            </ButtonGroup>
            <RubricModal 
             show={showRubric}
             close={() => setShowRubric(false)}
             title={task[0].task_title}
             points={task[0].task_points}
             count={task[0].task_count}
             info={task[0].task_info}
            />
        </View>
    );
}

export default TaskPage;