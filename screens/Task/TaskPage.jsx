import { Button, Grid, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';
import { View } from 'react-native';
import QuizTask from './QuizTask';
import VideoTask from './VideoTask';
import WebpageTask from './WebpageTask';
import FreeResponseTask from './FreeResponseTask';
import RubricModal from './RubricModal';
import TextPageTask from './TextPageTask';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import ImageTask from './ImageTask';
import './TaskPage.css';
import { separateOperations } from 'graphql';

/**
 * The general task page that will hold all components that define a task
 * This page displayed general information about the task and has a slot for 
 * a component that is the task item itself
 */

let TaskPage = ({ navigation }) => {
    const [currPage, setCurrPage] = React.useState(1);
    const [open , setOpen] = React.useState(false);
    let compCount = 0;

    // handle changes in the pagination
    const handleChange = (event, value) => {
        setCurrPage(value);
    };
    // handle opening of rubric
    const handleClickOpen = () => {
        setOpen(true);
    };
    // handle closing of rubric
    const handleClose = () => {
        setOpen(false);
    };

    const pulledTask = gql
    `
    query {
        task(taskId: "90e0c730e56"){
          name
          id
          points
          parentMissionId
          pages{
            blocks{
              title
              ... on TextBlock{
                contents
              }
              ... on ImageBlock{
                imageUrl
              }
              ... on QuizBlock{
                title
                blockId
                questions {
                  description
                }
                }
            }
          }
        }
      }
    `;

    const {data, error, loading} = useQuery(pulledTask);
    // console.log(data);

    let currComponents = [];
    let showRubric = false; // whether or not rubric button is active
    let rubric; // rubric object to be filled
    let navBarItems = [];

    const newTask = {
        name: "Intro to Covalant Bonds",
        rubric: {
            title: "Task #1",
            count: 5,
            points: 20,
            info: "Today we are going to be watching a short video followed by a quiz and finally have a few free response questions"
        },
        pages: [
            {
                blocks: [
                    {
                        title: "Covalent Bonds",
                        contents: "A covalent bond is a chemical bond that involves the" +
                         "sharing of electron pairs between atoms. These electron pairs" +
                         "are known as shared pairs or bonding pairs, and the stable" +
                         "balance of attractive and repulsive forces between atoms, when" + 
                         " they share electrons, is known as covalent bonding. For many" +
                         " molecules, the sharing of electrons allows each atom to attain " +
                         " the equivalent of a full outer shell, corresponding to a stable" +
                         "  electronic configuration. In organic chemistry, covalent bonds" +
                         " are much more common than ionic bonds."
                    },
                    {
                        title: "Sick pic",
                        imageUrl: "https://fastly.kastatic.org/ka-perseus-images/60f5834b8b3234e6482e0f201cca84c3a4271b63.png"
                    },
                    {
                        title: "ski trick",
                        testID:'YouTube',
                        videoUrl: "https://www.youtube.com/embed/TUZ_T_Rfios"
                    }
                ]
            },
            {
                blocks: [
                    {
                        title: "Steezy",
                        videoUrl: "https://www.youtube.com/embed/TUZ_T_Rfios"
                    },
                    {
                        title: "Quick Quiz",
                        questions: ["ques 1", " test 2", "test 3 question"],
                        options: [["option 1", "option 2"], ["option 1", "option 2", "option 3"],
                         ["option 1", "option 2", "option 3", "option 4"]],
                        answers: ["option 2", "option 3", "option 4"]
                    },
                    {
                        title: "Week 1 General information",
                        contents: "Hey class here is some information about what we are going to be \n" +
                         "doing in the coming week..."
                    },
                    {
                        title: "Quick lil article",
                        webpage: "https://en.wikipedia.org/wiki/Earth"
                    },
                    {
                        title: null,
                        FRQuestion: "Please describe the meaning of life below:"
                    }
                ]
            }
        ]
    }

    // fill the components array with the components that are currently being displayed
    let fillComponents = () => {
        for (let i=0; i<newTask.pages[currPage - 1].blocks.length;i++) {
            currComponents.push(typeFinder(newTask.pages[currPage - 1].blocks[i]));
        }
    }

    // finds the type of component it is and returns the correct one filled out
    let typeFinder = (component) => {
        // console.log("type: " + component);
        if (component.contents != null) {
            return <TextPageTask title={component.title}
             text={component.contents} />
        } else if (component.videoUrl != null) {
            return <VideoTask title={component.title}
             id={component.videoUrl} />
        } else if (component.questions != null) {
            return <QuizTask title={component.title}
             questions={component.questions}
             options={component.options}
             answers={component.answers} />
        } else if (component.webpage != null) {
            return <WebpageTask webpageUrl={component.webpage} />
        } else if (component.FRQuestion != null) {
            return <FreeResponseTask freeResponseQuestion={component.FRQuestion} />
        } else if (component.imageUrl != null) {
            return  <ImageTask pth={component.imageUrl} title={component.title}/> 
        }
    }

    // look through task to find rubric, if its there enable rubric button
    let findRubric = () => {
        if (newTask.rubric != null) {
            rubric = {
                task_title: newTask.rubric.title,
                task_count: newTask.rubric.count,
                task_points: newTask.rubric.points,
                task_info: newTask.rubric.info
            };
            showRubric = true;
        }
    }

    return (
        <View>
            {findRubric()}
            <h1 style={{textAlign: "center"}}>{newTask.name}</h1>
            <Grid container justify="center">
                <Pagination variant="outlined" count={newTask.pages.length} color="primary"
                page={currPage} onChange={handleChange}/>
            </Grid>
            <Button variant="contained" onClick={handleClickOpen}>
                Rubric!
            </Button>
            {fillComponents()}
            {currComponents.map((comp) => {
                return (
                    <div class={(compCount++ % 2 === 0) ? "lgDiv" : "dgDiv"}>
                        {comp}
                    </div>
                )
            })}
            <RubricModal 
             open={open}
             close={handleClose}
             title={rubric.task_title}
             points={rubric.task_points}
             count={rubric.task_count}
             info={rubric.task_info}
            />
        </View>
    );
}

export default TaskPage;