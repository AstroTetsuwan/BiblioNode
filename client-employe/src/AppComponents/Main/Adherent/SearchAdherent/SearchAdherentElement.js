import React from 'react';

import './AdherentElement.css';

function SearchAdherentElement(props){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return(
        <div className="row adherent-element">
            <div className="col-md-2">{props.user.nom}</div>
            <div className="col-md-2">{props.user.prenom}</div>
            <div className="col-md-2">{props.user.sexe}</div>
            <div className="col-md-2">{new Date(props.user.dob).toLocaleDateString('fr-FR', options)}</div>
            <div className="col-md-4">
                <div className="row" style={{textAlign: "center"}}>
                    <span className="col-md-4">
                        <i className="fas fa-eye fa-2x clickable-icon" id={"show-"+props.user.id} 
                        onClick={() => {props.handleAction(props.user.id, "show");}}></i>
                    </span>
                    <span className="col-md-4">
                        <i className="fas fa-user-edit fa-2x clickable-icon" id={"update-"+props.user.id} 
                        onClick={() => {props.handleAction(props.user.id, "update");}}></i>
                    </span>
                    {props.deleteActive && 
                        <span className="col-md-4">
                            <i className="fas fa-trash-alt fa-2x clickable-icon" id={"delete-"+props.user.id} 
                            onClick={() => {props.handleAction(props.user.id, "delete");}}></i>
                        </span>
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchAdherentElement;