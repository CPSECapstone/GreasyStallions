import React from 'react';
import { Button, Dialog, IconButton, Grid, DialogTitle, DialogActions, Typography, DialogContent, DialogContentText } from '@material-ui/core';

/*
 A modal that is always available to students so that they can see that task 
 assignment.
*/
let RubricModal = function({open, close, points, title, count, info}) {

    return (
        <Dialog onClose={close} open={open}>
            <Grid container spacing={3}>
                <Grid item xs>
                    <DialogTitle>
                        {title}
                    </DialogTitle>`
                </Grid>
                <Grid item xs>
                    <DialogTitle>
                        {"Points: " + points}
                    </DialogTitle>
                </Grid>
            </Grid>
            <DialogContent>
                <DialogContentText>
                    {info}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button disabled={true}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RubricModal;