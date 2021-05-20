import React from 'react';
import { Typography } from '@material-ui/core';
// import './TaskPage.css';

/**
 * Task page so simply display plain text
 * May be edited later to allow for formatted text files or input
 */

let TextPageTask = function({ title, text, size }) {
    
    return (
        <div>
            <Typography class="componentHeader" variant="h4" component="h4">
                {title}
            </Typography>
            <Typography variant="body1" component="h2">
                {text}
            </Typography>
        </div>
    );
}

export default TextPageTask;