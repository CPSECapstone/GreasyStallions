import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useQuery, useMutation, gql} from '@apollo/client';

const GET_USER = gql
	`
		query{
			getUser{
			email
			}
		}
	`;

const ADD_COURSE = gql
	`
		mutation ($course: String!, $instructor: String!, $description: String!) {
			addCourse(
				course:{
					course: $course
					instructor: $instructor
					description: $description
				}
			)
		}
	`;

export default function CreateCourse()  {
  	const [open, setOpen] = React.useState(false);
  	const [name, setName] = React.useState('');
  	const [desc, setDesc] = React.useState('');
	const [addCourse, {data1, error1}] = useMutation(ADD_COURSE);
	const {data, error, loading} = useQuery(GET_USER);
	if(error){console.log('error getting user')};

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNameChange = event => {
        setName(event.target.value);
    };
    
    const handleDescChange = event => {
        setDesc(event.target.value);
    };
	  

    function submit(){   
		let email = '';
		email = data.getUser.email;
		addCourse({ 
			variables:{ 
				"course": name, 
				"instructor": email, 
				"description": desc 
			}   
		});
    }

    return (
        <div>
          	<Button variant="outlined" color="primary" onClick={handleClickOpen}>
            	Add Course
          	</Button>
          	<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add Course</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please fill out the form and press submit to add a course.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Course Name"
						type="text"
						fullWidth
						onChange={handleNameChange}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Description"
						type="text"
						fullWidth
						onChange={handleDescChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={() => submit()} color="primary">
						Submit
					</Button>
				</DialogActions>
          	</Dialog>
        </div>
      );

}
