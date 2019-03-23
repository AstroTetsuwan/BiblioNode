import React from 'react';

function SubmitButton(props){
    return(
        <button type="submit" className="btn btn-default">{props.name}</button>
    ); 
};

export default SubmitButton;