import { AppBar, Button, Grid, Paper, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';
import { View } from 'react-native';
import QuizTask from './QuizTask';
import VideoTask from './VideoTask';
import WebpageTask from './WebpageTask';
import RubricModal from './RubricModal';
import TextPageTask from './TextPageTask';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import ImageTask from './ImageTask';
import './TaskPage.css';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { separateOperations } from 'graphql';

/**
 * The general task page that will hold all components that define a task
 * This page displayed general information about the task and has a slot for 
 * a component that is the task item itself
 */

let TaskPage = ({ route, navigation }) => {
    const { id } = route.params;
    const [currPage, setCurrPage] = React.useState(1);
    const [open , setOpen] = React.useState(false);
    const [taskInfo, setTaskInfo] = React.useState();
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
    `query {
        task(taskId: "${id}") {
          id
          requirements {
            id
            description
          }
          name
          pages {
            skippable
            blocks {
              title
              __typename
              ... on ImageBlock {
                imageUrl
              }
              ... on TextBlock {
                contents
                fontSize
              }
              ... on VideoBlock {
                videoUrl
              }
              ... on QuizBlock {
                requiredScore
                questions {
                  __typename
                  ...on FrQuestion {
                    id
                    description
                    answer
                  }
                  ...on McQuestion {
                    id
                    description
                    options {
                      id
                      description
                    }
                    answers
                  }
                }
              }
            }
          }
        }
      }
    `;
    
    let currComponents = [];
  
    const {data, error, loading} = useQuery(pulledTask); 
    if (loading) {
        return <View></View>
    }

    // fill the components array with the components that are currently being displayed
    let fillComponents = () => {
        if (data.task.pages.length !== 0) {
            for (let i=0; i<data.task.pages[currPage - 1].blocks.length;i++) {
                currComponents.push(typeFinder(data.task.pages[currPage - 1].blocks[i]));
            }
        } else {
            currComponents.push(<div/>);
        }
    }

    // finds the type of component it is and returns the correct one filled out
    let typeFinder = (component) => {
        if (component.__typename === "TextBlock") {
            return <TextPageTask title={component.title}
             text={component.contents} size={component.fontSize}/>
        } else if (component.__typename === "VideoBlock") {
            return <VideoTask title={component.title}
             id={component.videoUrl} />
        } else if (component.__typename === "QuizBlock") {
            return <QuizTask title={component.title}
             questions={component.questions}
             answers={component.answers} />
        } else if (component.webpage != null) {
            return <WebpageTask webpageUrl={component.webpage} />
        } else if (component.__typename === "ImageBlock") {
            return  <ImageTask pth={component.imageUrl} title={component.title}/> 
        }
    }

    return (
        <View>
            <Grid container justify="center">
                <Typography class="componentHeader" variant="h3" component="h3"> 
                    {data.task.name.toUpperCase()}
                </Typography>
            </Grid>
            <Grid container justify="center">
                <Pagination variant="outlined" count={data.task.pages.length} color="primary"
                 page={currPage} onChange={handleChange} size="large"/>
            </Grid>
            <Button class="rubricButton" disabled={!data.task.requirements.length} variant="contained" onClick={handleClickOpen}>
                TASK RUBRIC
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
             requirements={data.task.requirements}
            />
        </View>
    );

}

export default TaskPage;