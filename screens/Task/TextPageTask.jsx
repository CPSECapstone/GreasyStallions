import React from 'react';

/**
 * Task page so simply display plain text
 * May be edited later to allow for formatted text files or input
 */

let TextPageTask = function({ title, text }) {
    
    return (
        <div>
            <h2>{title}</h2>
            <h5>{text}</h5>
        </div>
    );
}

export default TextPageTask;