import React from 'react';
import { Button, Paper, Dialog, FormGroup, IconButton, Grid, DialogTitle, DialogActions, Typography, DialogContent, DialogContentText, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';

/*
 A modal that is always available to students so that they can see that task 
 assignment.
*/
let RubricModal = function({open, close, points, requirements, info}) {

    let reqs = [];
    let completed = false;

    const [checked, setChecked] = React.useState(Array(requirements.length).fill(false));
    
    // update wether or not a part of requirments have been completed.
    const handleChange = (event) => {
        let tempChks = [...checked];
        tempChks[event.target.name] = event.target.checked;
        setChecked(tempChks);
    };

    // creates each check box that contains a requirment
    requirements.forEach((element, idx) => {
        reqs.push(
        <Paper style={{paddingLeft: '10px', marginTop: '10px',
         marginRight: '5px', marginLeft: '5px',
         marginBottom: '10px'}}elevation={3}>
            <FormControlLabel
             control={<Checkbox checked={checked[idx]} color="primary" name={idx} />}
             label={element.description} onChange={handleChange} labelPlacement="end"/>
        </Paper>);
    });
 
    // check to see if all requirments are completed to allow for submission
    let i = 0;
    while(checked[i] === true && i < checked.length) {
        i++;
    }
    if (i === checked.length) {
        completed = true;
    }
 

    return (
        <Dialog onClose={close} open={open}>
            <Grid container justify="center">
                <DialogTitle class="componentHeader">
                    TASK RUBRIC
                </DialogTitle>
            </Grid>
            <FormControl component="fieldset">
                <FormGroup>           
                    {reqs}
                </FormGroup>
            </FormControl>
            <DialogActions>
                <Grid container justify="center">
                    <Button disabled={!completed} variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}

export default RubricModal;