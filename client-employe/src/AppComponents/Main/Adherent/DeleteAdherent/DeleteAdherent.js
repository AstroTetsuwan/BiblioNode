import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import ErrorMessage from '../../../../ReusableComponents/ErrorComponents/ErrorMessage';

class DeleteAdherent extends React.Component{
    constructor(props){
        super(props);
        this.state = { redirect: false, error: false };
    }

    componentDidMount(){
//this.props.match.params.id 
        Axios.get('/api/adherent/delete/' + this.props.match.params.id)
        .then((success) => {
            this.setState({ redirect: true, error: false });
        })
        .catch((err) => {
            const state = this.state;
            state.error = err.response.data.error;
            this.setState(state); 
        })
    }

    render(){
        if(this.state.error){ return <ErrorMessage message={this.state.error} level="danger"/> }
        if(this.state.redirect){ return <Redirect to="/adherent/search"/>; }

        return(
            <div>
                <p>Suppression employé... Vous allez être redirigé. {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default DeleteAdherent;