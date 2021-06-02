import React, {useState} from 'react';
import { ScrollView, TouchableOpacity,  Button, View,  StyleSheet } from 'react-native';
import { Surface, Title, Title, Text, Portal, Provider, Modal } from 'react-native-paper';
import QuizTask from './QuizTask';
import VideoTask from './VideoTask';
import WebpageTask from './WebpageTask';
import FreeResponseTask from './FreeResponseTask';
import RubricModal from './RubricModal';
import TextPageTask from './TextPageTask';
import { ApolloProvider, useQuery, gql} from '@apollo/client';
import ImageTask from './ImageTask';
import  Styles  from '../../styles/styles';
import { separateOperations } from 'graphql';
import Styles from '../../styles/styles'

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
    const [show, setShow] = useState(false)
    let compCount = 0;
    const containerStyle = {backgroundColor: 'white', padding: 20};

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
        return <View><Text>Loading...</Text></View>
    }

    // fill the components array with the components that are currently being displayed
    let fillComponents = () => {
        if (data.task.pages.length !== 0) {
            for (let i=0; i<data.task.pages[currPage - 1].blocks.length;i++) {
                currComponents.push(typeFinder(data.task.pages[currPage - 1].blocks[i]));
            }
        }
    }

    // finds the type of component it is and returns the correct one filled out
    let typeFinder = (component) => {
      console.log(component)
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
        } else if (component.FRQuestion != null) {
            return <FreeResponseTask freeResponseQuestion={component.FRQuestion} />
        } else if (component.__typename === "ImageBlock") {
            return  <ImageTask pth={component.imageUrl} title={component.title}/> 
        }
    }

    return (
        <View>
          <Button mode='contained' title= 'Show Rubric' onPress={() => setShow(true)} />
          <Provider>
            <Portal>
            <Title style={Styles.taskPageTitle}>{data.task.name.toUpperCase()}</Title>
              {fillComponents()}
              {currComponents.map((comp, idx) => {
                  return (
                      <View style={(compCount++ % 2 === 0) ? Styles.taskPageComponentBackgroundLG : Styles.taskPageComponentBackgroundDG}>
                          {comp}
                      </View>
                  )
              })}
            <RubricModal/>
          </Portal>
        </Provider>
      </View>
    );
}

export default TaskPage;

