import React from 'react';
import { Redirect } from 'react-router-dom';

import TextInput from '../../../../ReusableComponents/FormsComponents/TextInput';
import DateInput from '../../../../ReusableComponents/FormsComponents/DateInput';
import SelectInput from '../../../../ReusableComponents/FormsComponents/SelectInput';
import SubmitButton from '../../../../ReusableComponents/FormsComponents/SubmitButton';

import ErrorMessage from '../../../../ReusableComponents/ErrorComponents/ErrorMessage';

import '../FormEmploye.css';
import axios from 'axios';

class AddEmploye extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user: {
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

    
    handleChange(id, text){
        const state = this.state;
        state.user[id] = text;
        this.setState(state);
    }

    handleSubmit(e){
        axios.post('/api/employe/add', this.state.user)
        .then((response) => {
            this.setState({ redirect: "/employe/show/" + response.data.userId});
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
                <h3>Enregistrer un nouvel employé</h3>
                
                {this.state.error && <ErrorMessage message={this.state.error} level="danger"/>}

                <div id="employe-form-wrapper">
                    <form onSubmit={this.handleSubmit} id="employe-form">
                        <div className="form-row">
                            <TextInput label={true}  focus={true} id="nom" name="Nom" type="text" onChange={this.handleChange} value={this.state.user.nom} required="required" col="col-md-6"/>
                            <TextInput label={true} id="prenom" name="Prenom" type="text" onChange={this.handleChange} value={this.state.user.prenom} required="required" col="col-md-6"/>
                        </div>
                        <div className="form-row">
                            <SelectInput id="sexe" name="Sexe" value={this.state.user.sexe} onChange={this.handleChange} options={["H","F"]} col="col-md-4"/>
                            <DateInput  id="dob" name="Date de naissance" value={this.state.user.dob} onChange={this.handleChange} col="col-md-4"/>
                            <SelectInput id="categorieEmploye" name="Categorie Employé" value={this.state.user.categorieEmploye} 
                                onChange={this.handleChange} options={['BIBLIOTHECAIRE' , 'RESPONSABLE' , 'GESTIONNAIRE']} col="col-md-4"/>
                        </div>
                        <div className="form-row">
                            <TextInput label={true} id="pseudo" name="Pseudo" type="text" onChange={this.handleChange} value={this.state.user.pseudo} required="required" col="col-md-6"/>
                            <TextInput label={true} id="password" name="Password" type="password" onChange={this.handleChange} value={this.state.user.password} required="required" col="col-md-6"/>
                        </div>        
                        <div id="employe-form-button-wrapper"><SubmitButton name="Enregistrer"/></div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddEmploye;