import React from 'react';

export const Common = ({title}) => {
    return (
        <React.Fragment>
        <h1>{title}</h1>
        <hr/>
        <p>This is a common page</p>
        </React.Fragment>
    )
}