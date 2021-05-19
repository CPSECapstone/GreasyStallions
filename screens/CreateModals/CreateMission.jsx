import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useQuery, useMutation, gql} from '@apollo/client';

const ADD_MISSION = gql
	`
		mutation ($course: String!, $name: String!, $description: String!) {
			addMission(
				course:{
					course: $course
					name: $name
					description: $description
				}
			)
		}
	`;

//this modal uses MaterialUI Dialog to create a modal that is a form for an Instructor
//to create a Mission object, and is sent to our database
export default function CreateMission(course)  {
  	const [open, setOpen] = React.useState(false);
  	const [name, setName] = React.useState('');
  	const [desc, setDesc] = React.useState('');
	const [addMission, {data1, error1}] = useMutation(ADD_MISSION);

    const handleNameChange = event => {
        setName(event.target.value);
    };

    const handleDescChange = event => {
        setDesc(event.target.value);
    };


    function submit(){   
		addMission({ 
			variables:{ 
				"course": course, 
				"name": name, 
				"description": desc 
			}   
		});
    }

    return (
        <div>
          	<Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
            	Add Mission
          	</Button>
          	<Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add Mission</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please fill out the form and press submit to add a mission.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Mission Name"
						type="text"
						fullWidth
						onChange={handleNameChange}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Mission Description"
						type="text"
						fullWidth
						onChange={handleDescChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary">
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