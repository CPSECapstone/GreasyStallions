import { Form, Button, FormLabel, ButtonGroup, ToggleButton } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import QuizTask from './QuizTask';
import VideoTask from './VideoTask';


let TaskPage = ({ navigation }) =>{
    const [showQuiz, setShowQuiz] = React.useState(false);
    const [showVideo, setShowVideo] = React.useState(false);
    const [taskNum, setTaskNum] = React.useState(0);

    let genTask;

    let changeTaskNum = (type) => {
        if (type === "+") {
            if  (taskNum < task.length - 1) {
               setTaskNum(taskNum + 1);
            }
         }
   
         if (type === "-" && taskNum != 0) {
            setTaskNum(taskNum - 1);
         }
    }
    
    const task = [
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


    if (task[taskNum].task_type == "video") {
        genTask = <VideoTask id={task[taskNum].task_video}/>
    } else if  (task[taskNum].task_type == "quiz") {
        genTask = <QuizTask questions={task[taskNum].task_questions}
         options={task[taskNum].task_options}
         answers={task[taskNum].answers}/>
    } 

    return (
        <View>
            <h2>{task[taskNum].task_num + "/" + task.length + ": " + task[taskNum].task_title}</h2>
            {console.log("Type of task: " + genTask)}
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
        </View>
    )
}

export default TaskPage;