import React from 'react';
import axios from 'axios';

import ScanExemplaire from './ScanExemplaire';

import ErrorMessage from '../../../ReusableComponents/ErrorComponents/ErrorMessage';

class RetourPret extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    handleSubmit = (idExemplaire) => {
        console.log(idExemplaire);
        axios.post('/api/utilisateur/emprunt/retour',{idExemplaire: idExemplaire})
        .then(success => this.setState({success: "Le retour est enregistré."}, () => {
            window.setTimeout(() => {this.setState({success: false})}, 3000);
        }))
        .catch(err => this.setState({error: "Une erreur est survenue."}));
    }

    render(){
        return (
            <div>
                <h3>Retour d'un prêt</h3>
                {this.state.error && <ErrorMessage message={this.state.error}/>}
               {this.state.success && <ErrorMessage message={this.state.success} level="success"/>}
                <ScanExemplaire handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default RetourPret;