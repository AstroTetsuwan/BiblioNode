import React from 'react';

function SubmitButton(props){
    return(
        <button type="submit" className="btn btn-primary">{props.name}</button>
    ); 
};

export default SubmitButton;