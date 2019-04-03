import React from 'react';
import axios from 'axios';

import ErrorMessage from '../../../ReusableComponents/ErrorComponents/ErrorMessage';

import SearchUser from './SearchUser';
import UtilisateurInfos from '../Utilisateur/UtilisateurInfos';

import ScanExemplaire from './ScanExemplaire';

class AddPret extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
            user: false,
            error: false
        }

        this.handleSubmitUser = this.handleSubmitUser.bind(this);
    }

    handleSubmitUser(userId){
       this.loadUser(userId);
    }

    loadUser(userId){
        axios.get('/api/utilisateur/find/' + userId)
        .then(response => this.setState({user: response.data.user}))
        .catch(err => this.setState({error: "Une erreur est survenue"}));
    }

    handleSubmitExemplaire = (idExemplaire) => {
        axios.post('/api/utilisateur/emprunt/add', {
            user: this.state.user,
            idExemplaire: idExemplaire
        })
        .then(success => this.setState({success: "L'emprunt est enregistré."}, () => {
            window.setTimeout(() => {
                this.setState({success: false});
                this.loadUser(this.state.user.id);
            }, 5000);
        }))
        .catch(err => this.setState({error: err.response.data.error}, () => {
            window.setTimeout(() => {this.setState({error: false})}, 5000);
        }));

    }

    render(){
        return(
            <div>
                {this.state.error && <ErrorMessage message={this.state.error}/>}
                {this.state.success && <ErrorMessage message={this.state.success} level="success"/>}

                {!this.state.user && <SearchUser handleSubmit={this.handleSubmitUser} />}

                {this.state.user && 
                    <div>
                        <UtilisateurInfos user={this.state.user}/>
                        <ScanExemplaire handleSubmit={this.handleSubmitExemplaire}/>
                    </div>
                    
                }
            </div>
        );
    }
}

export default AddPret;