import { Button, Col, ButtonGroup, Pagination, Row, ListGroup, Navbar, Nav } from 'react-bootstrap';
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

/**
 * The general task page that will hold all components that define a task
 * This page displayed general information about the task and has a slot for 
 * a component that is the task item itself
 */

let TaskPage = ({ navigation }) => {
    const [currPage, setCurrPage] = React.useState(0);
    const [showRubricModal, setShowRubricModal] = React.useState(false);

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
    console.log(data);

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
        for (let i=0; i<newTask.pages[currPage].blocks.length;i++) {
            currComponents.push(typeFinder(newTask.pages[currPage].blocks[i]));
        }
    }

    // finds the type of component it is and returns the correct one filled out
    let typeFinder = (component) => {
        console.log("type: " + component);
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

    // fill out the nav bar for the task
    navBarItems.push(<Pagination.Prev onClick={() => setCurrPage(currPage - 1)}/>)
    for (let number = 0; number < newTask.pages.length; number++) {
        navBarItems.push(
            <Pagination.Item key={number} onClick={() => setCurrPage(number)}>
                {number + 1}
            </Pagination.Item>
        )
    }
    navBarItems.push(<Pagination.Next onClick={() => setCurrPage(currPage + 1)}/>)

    return (
        <View>
            {findRubric()}
            <Navbar bg="light" fixed="bottom">
                <Navbar.Brand>Flipt.ED</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link onClick={() => setShowRubricModal(true)}>Rubric</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Row>
                <Col sm="4"/>
                <Col sm="4"><h1 style={{textAlign: "center"}}>{newTask.name}</h1></Col>
                <Col sm="4"/>
            </Row>
            <Pagination>{navBarItems}</Pagination>
            {fillComponents()}
            {console.log("len: " + currComponents.length)}
            {console.log(currComponents)}
            {currComponents.map((comp) => {
                return (
                    <div>
                        {comp}
                    </div>
                )
            })}
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