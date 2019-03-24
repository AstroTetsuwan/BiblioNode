import React from 'react';
import Axios from 'axios';

class ShowEmploye extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user: "",
            error: null
        };
    }
    componentDidMount(){
        Axios.get('/api/employe/find/' + this.props.match.params.id)
        .then((response) => {
            let user = response.data.user;
            console.log(user)
            this.setState({user: response.data.user, error: null});
        })
        .catch((err) => {
            console.log(err);
            this.setState({user: {}, error: err});
        });
    }

    render(){
        if(this.state.error !== null){
            return (<div>
                <div className="alert alert-danger" role="alert">"Une erreur est survenue.</div>
            </div>);
        }

        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return (
            <div>
                <h3 style={{marginBottom:"50px"}}>Employé:</h3>

                {(this.state.user !== null && this.state.error === null) &&
                <div style={{fontSize:"1.2em"}}>
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
                        <p>Catégorie employé: {this.state.user.categorieEmploye}</p>
                    </div>
                    <div className="col-md-6">
                        <p>Matricule: {this.state.user.matricule}</p>
                    </div>
                </div>
                }
                {this.state.error !== null &&
                    <div className="alert alert-danger" role="alert">
                        {this.state.error}
                    </div>
                }
            </div>
        )
    }
}

export default ShowEmploye;