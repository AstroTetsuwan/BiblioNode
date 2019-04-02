import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import ErrorMessage from '../../../../ReusableComponents/ErrorComponents/ErrorMessage';
import UtilisateurInfos from '../../Utilisateur/UtilisateurInfos';

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
        if(!Number.isNaN(this.props.match.params.id)){
            this.loadUserData(this.props.match.params.id);
        } else{
            this.setState({user: {}, error: "Une erreur est survenue."});
        }
    }

    loadUserData(id){
        Axios.get('/api/utilisateur/find/' + id)
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

    handleDelete(){
        if(window.confirm("Confirmer la suppression de l'adhérent.")){
            const state = this.state;
            state.redirectDelete = true;
            this.setState(state);
        }    
    }

    handleUpdateCotisation(){
        Axios.get('/api/adherent/update-cotisation/' + this.state.user.id)
        .then(success => { this.loadUserData(this.state.user.id); })
        .catch(err => {console.log(err);  this.setState({user: {}, error: "Une erreur est survenue."}); });
    }

    render(){
        if(this.state.error){ return <ErrorMessage message={this.state.error} level="danger"/> }   
        
        if(this.state.redirectUpdate){  return <Redirect to={"/adherent/update/" + this.state.user.id}/>; }
        if(this.state.redirectDelete){  return <Redirect to={"/adherent/delete/" + this.state.user.id}/>; }
        
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return (
            <div>
                <h3 style={{marginBottom:"50px"}}>Adhérent:</h3>

                {this.state.user && <UtilisateurInfos user={this.state.user}/>}
                
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