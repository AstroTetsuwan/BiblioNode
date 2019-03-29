import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import ErrorMessage from '../../../../ReusableComponents/ErrorComponents/ErrorMessage';
import UtilisateurInfos from '../../Utilisateur/UtilisateurInfos';

class ShowEmploye extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user: {},
            error: false,
            redirectUpdate: false
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount(){
        Axios.get('/api/employe/find/' + this.props.match.params.id)
        .then((response) => {
            this.setState({user: response.data.user, error: false, redirectUpdate: false});
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

    render(){
        if(this.state.error){ return <ErrorMessage message={this.state.error} level="danger"/> }   
        
        if(this.state.redirectUpdate){  return <Redirect to={"/employe/update/" + this.state.user.id}/>; }
        if(this.state.redirectDelete){  return <Redirect to={"/employe/delete/" + this.state.user.id}/>; }
        
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return (
            <div>
                <h3 style={{marginBottom:"50px"}}>Employé:</h3>
                

                {this.state.user && <UtilisateurInfos user={this.state.user}/>}
                
                <div style={{textAlign: "right", padding:"30px"}}>
                    <button type="button" className="btn btn-warning" style={{marginRight:"20px"}} onClick={this.handleUpdate}>Modifier</button>
                    <button type="button" className="btn btn-danger"  onClick={this.handleDelete}>Supprimer</button>
                </div>
            </div>
        )
    }
}

export default ShowEmploye;