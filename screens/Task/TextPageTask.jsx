import React from 'react';
import { Typography } from '@material-ui/core';

/**
 * Task page so simply display plain text
 * May be edited later to allow for formatted text files or input
 */

let TextPageTask = function({ title, text }) {
    
    return (
        <div>
            <Typography variant="h4" component="h2">
                {title}
            </Typography>
            <Typography variant="body1" component="h2">
                {text}
            </Typography>
        </div>
    );
}

export default TextPageTask;