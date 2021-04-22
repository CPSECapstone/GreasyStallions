import React from 'react';

/**
 * Task page so simply display plain text
 * May be edited later to allow for formatted text files or input
 */

let TextPageTask = function({ text }) {
    
    return (
        <h5>{text}</h5>
    );
}

export default TextPageTask;