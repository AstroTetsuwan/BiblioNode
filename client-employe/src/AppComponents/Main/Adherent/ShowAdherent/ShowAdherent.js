import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import ErrorMessage from '../../../../ReusableComponents/ErrorComponents/ErrorMessage';


class ShowAdherent extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user: {},
            error: false,
            redirectUpdate: false, 
            showDeleteBtn: false
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdateCotisation = this.handleUpdateCotisation.bind(this);
    }
    componentDidMount(){
        Axios.get('/api/adherent/find/' + this.props.match.params.id)
        .then((response) => {
            console.log(response.data.user);
            this.setState({
                user: response.data.user, 
                error: false, 
                redirectUpdate: false, 
                showDeleteBtn: this.props.user.categorieEmploye === 'RESPONSABLE' ? true : false});
        })
        .catch((err) => {
            console.log(err);
            this.setState({user: {}, error: "Une erreur est survenue."});
        });
    }

    handleUpdate(){
        const state = this.state;
        state.redirectUpdate = true;
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

    handleUpdateCotisation(){

    }

    render(){
        if(this.state.error){ return <ErrorMessage message={this.state.error} level="danger"/> }   
        
        if(this.state.redirectUpdate){  return <Redirect to={"/adherent/update/" + this.state.user.id}/>; }
        if(this.state.redirectDelete){  return <Redirect to={"/adherent/delete/" + this.state.user.id}/>; }
        
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return (
            <div>
                <h3 style={{marginBottom:"50px"}}>Adhérent:</h3>
                <div className="row" style={{fontSize:"1.2em"}}>
                    <div className="col-md-6">
                        <p>Nom: {this.state.user.nom}</p>
                    </div>
                    <div className="col-md-6">
                        <p>Prénom: {this.state.user.prenom}</p>
                    </div>
                    
                    <div className="col-md-6">
                        <p>Date de naissance: {new Date(this.state.user.dob).toLocaleDateString('fr-FR', options)}</p>
                    </div>
                    <div className="col-md-6">
                        <p>Sexe: {this.state.user.sexe}</p>
                    </div>
                    <div className="col-md-12">
                        <p>Pseudo: {this.state.user.pseudo}</p>
                    </div>
                    <div className="col-md-6">
                        <p>Téléphone: {this.state.user.telephone}</p>
                    </div>
                    <div className="col-md-6">
                        <p>Date de paiement cotisation: {new Date(this.state.user.dateCotisation).toLocaleDateString('fr-FR', options)}</p>
                    </div>
                </div>
                <div style={{textAlign: "right", padding:"30px"}}>
                    <button type="button" className="btn btn-primary" style={{marginRight:"20px"}} onClick={this.handleUpdateCotisation}>Renouveler la cotisation</button>
                    <button type="button" className="btn btn-warning" style={{marginRight:"20px"}} onClick={this.handleUpdate}>Modifier</button>
                    {this.state.showDeleteBtn && 
                        <button type="button" className="btn btn-danger"  onClick={this.handleDelete}>Supprimer</button>
                    }
                </div>
            </div>
        )
    }
}

export default ShowAdherent;