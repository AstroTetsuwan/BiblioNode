import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import EmployeElement from './EmployeElement';

import ErrorMessage from '../../../../ReusableComponents/ErrorComponents/ErrorMessage';

class ListEmploye extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            users: [],
            error: false,
            redirectShow: false,
            redirectUpdate: false, 
            redirectDelete: false, 
            userId: null
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        Axios.get('/api/employe/findAll')
        .then((response) => {
            const state = this.state;
            state.users = response.data.map((user, i) =>{ return <EmployeElement key={i}  
                handleShow={this.handleShow} handleUpdate={this.handleUpdate} handleDelete={this.handleDelete}
                user={{nom: user.nom, prenom: user.prenom, sexe: user.sexe, dob: user.date_naissance, id: user.id_utilisateur}}/> });
            this.setState(state);
        })
        .catch((err) => {
            console.log(err);
            const state = this.state;
            state.error = "Une erreur est survenue.";
            this.setState(state);
        })
    }

    handleShow(userId){
        const state = this.state;
        state.redirectShow = true;
        state.userId = userId;
        this.setState(state);
    }

    handleUpdate(userId){
        const state = this.state;
        state.redirectUpdate = true;
        state.userId = userId;
        this.setState(state);
    }

    handleDelete(userId){
        if(window.confirm("Confirmer la suppression de l'employé.")){
            const state = this.state;
            state.redirectDelete = true;
            state.userId = userId;
            this.setState(state);
        }    
    }

    render(){
        if(this.state.error){ return <ErrorMessage message={this.state.error} level="danger"/> }

        if(this.state.redirectShow){  return <Redirect to={"/employe/show/" + this.state.userId}/>; }       
        if(this.state.redirectUpdate){  return <Redirect to={"/employe/update/" + this.state.userId}/>; }        
        if(this.state.redirectDelete){  return <Redirect to={"/employe/delete/" + this.state.userId}/>; }
        
        return(
            <div style={{padding: "10px"}}>
                <h3 style={{marginBottom:"50px"}}>Employés:</h3>
                <div className="row" style={{fontSize:"1.2em", fontWeight:"bold", marginBottom: "20px"}}>
                    <div className="col-md-2">Nom</div>
                    <div className="col-md-2">Prénom</div>
                    <div className="col-md-2">Sexe</div>
                    <div className="col-md-2">Date de naissance</div>
                    <div className="col-md-4">
                        <div className="row" style={{textAlign: "center"}}>
                            <span className="col-md-4">Voir</span><span className="col-md-4">Modifier</span><span className="col-md-4">Supprimer</span>
                        </div>
                    </div>
                </div>
                {this.state.users}
            </div>
        );
    }
}
export default ListEmploye;