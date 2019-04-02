import React from 'react';

function ErrorMessage(props){
    return (
        <div className={"alert alert-" + (props.level || "danger")} role="alert">
            {props.message}
        </div>
    );
}

export default ErrorMessage; 