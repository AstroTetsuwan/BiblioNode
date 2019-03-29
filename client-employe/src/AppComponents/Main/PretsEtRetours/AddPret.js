import React from 'react';
import axios from 'axios';

import ErrorMessage from '../../../ReusableComponents/ErrorComponents/ErrorMessage';

import SearchUser from './SearchUser';
import UtilisateurInfos from '../Utilisateur/UtilisateurInfos';

class AddPret extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
            user: false,
            error: false
        }

        this.handleSubmitUser = this.handleSubmitUser.bind(this);
    }

    handleSubmitUser(userid){
        axios.get('/api/utilisateur/find/' + userid)
        .then(response => this.setState({user: response.data.user}))
        .catch(err => this.setState({error: "Une erreur est survenue"}));
    }

    render(){
        return(
            <div>
                {this.state.error && <ErrorMessage message={this.state.error} level="success"/>}

                {!this.state.user && <SearchUser handleSubmit={this.handleSubmitUser} />}

                {this.state.user && 
                    <UtilisateurInfos user={this.state.user}/>

                    //input text exemplaire id -> post 'emprunt/add' -> if user can OK -> insert -> ELSE -> return errorMESSAGE
                }
            </div>
        );
    }
}

export default AddPret;