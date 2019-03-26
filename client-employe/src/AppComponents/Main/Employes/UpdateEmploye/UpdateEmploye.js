import React from 'react';
import { Redirect } from 'react-router-dom';

import TextInput from '../../../../ReusableComponents/FormsComponents/TextInput';
import DateInput from '../../../../ReusableComponents/FormsComponents/DateInput';
import SelectInput from '../../../../ReusableComponents/FormsComponents/SelectInput';
import SubmitButton from '../../../../ReusableComponents/FormsComponents/SubmitButton';

import '../FormEmploye.css';

import ErrorMessage from '../../../../ReusableComponents/ErrorComponents/ErrorMessage';
import axios from 'axios';

class UpdateEmploye extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user: { //DEFAULTS WHILE LOADING -> else error making "uncontrolled" input "controlled" during lifetime of the app
                nom: "",
                prenom: "",
                pseudo: "",
                password: "",
                dob: "",
                sexe: "H",
                categorieEmploye: "BIBLIOTHECAIRE" 
            },
            error: false,
            redirect: false
        }        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        axios.get('/api/employe/find/' + this.props.match.params.id)
        .then((response) => {
            console.log(response.data.user);
            response.data.user.dob = response.data.user.dob.split('T')[0];//Getting yyyy-mm-dd from the date
            this.setState({user: response.data.user, error: false, redirect: false});
        })
        .catch((err) => {
            console.log(err);
            this.setState({user: {
                nom: "",
                prenom: "",
                pseudo: "",
                password: "",
                dob: "",
                sexe: "H",
                categorieEmploye: "BIBLIOTHECAIRE" 
            }, error: "Une erreur est survenue.", redirect: false});
        });
    }

    
    handleChange(id, text){
        const state = this.state;
        state.user[id] = text;
        this.setState(state);
    }

    handleSubmit(e){
        axios.post('/api/employe/update', this.state.user)
        .then((response) => {
            this.setState({ redirect: "/employe/show/" + this.state.user.id});
        })
        .catch((err) => { 
            const state = this.state;
            state.error = err.response.data.error;
            this.setState(state); 
        })
        e.preventDefault();
    }

    render(){
        if(this.state.redirect){ return <Redirect to={this.state.redirect}/> }

        return(
            <div id="employe-wrapper">
                <h3>Modifier un employé</h3>

                {this.state.error && <ErrorMessage message={this.state.error} level="danger"/>}

                <div id="employe-form-wrapper">
                    <form onSubmit={this.handleSubmit} id="employe-form">
                        <div className="form-row">
                            <TextInput id="nom" name="Nom" type="text" onChange={this.handleChange} value={this.state.user.nom} required="required" col="col-md-6"/>
                            <TextInput id="prenom" name="Prenom" type="text" onChange={this.handleChange} value={this.state.user.prenom} required="required" col="col-md-6"/>
                        </div>
                        <div className="form-row">
                            <SelectInput id="sexe" name="Sexe" value={this.state.user.sexe} onChange={this.handleChange} options={["H","F"]} col="col-md-4"/>
                            <DateInput  id="dob" name="Date de naissance" value={this.state.user.dob} onChange={this.handleChange} col="col-md-4"/>
                            <SelectInput id="categorieEmploye" name="Categorie Employé" value={this.state.user.categorieEmploye} 
                                onChange={this.handleChange} options={['BIBLIOTHECAIRE' , 'RESPONSABLE' , 'GESTIONNAIRE']} col="col-md-4"/>
                        </div>
                        <div className="form-row">
                            <TextInput id="pseudo" name="Pseudo" type="text" onChange={this.handleChange} value={this.state.user.pseudo} required="required" col="col-md-12"/>
                        </div>        
                        <div id="employe-form-button-wrapper"><SubmitButton name="Enregistrer"/></div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateEmploye;