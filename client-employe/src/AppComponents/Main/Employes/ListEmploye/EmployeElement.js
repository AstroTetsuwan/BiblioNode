import React from 'react';

import './EmployeElement.css';

function EmployeElement(props){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return(
        <div className="row employe-element" id={props.user.id} 
                onClick={() => {props.handleClick(props.user.id);}}>
            <div className="col-md-3">{props.user.nom}</div>
            <div className="col-md-3">{props.user.prenom}</div>
            <div className="col-md-3">{props.user.sexe}</div>
            <div className="col-md-3">{new Date(props.user.dob).toLocaleDateString('fr-FR', options)}</div>
        </div>
    );
}

export default EmployeElement;