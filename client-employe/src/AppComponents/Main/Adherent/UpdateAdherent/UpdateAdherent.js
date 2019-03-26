import React from 'react';
import axios from 'axios';

import { Redirect } from 'react-router-dom';

import TextInput from '../../../../ReusableComponents/FormsComponents/TextInput';
import DateInput from '../../../../ReusableComponents/FormsComponents/DateInput';
import SelectInput from '../../../../ReusableComponents/FormsComponents/SelectInput';
import SubmitButton from '../../../../ReusableComponents/FormsComponents/SubmitButton';
import '../../Employes/FormEmploye.css';

import ErrorMessage from '../../../../ReusableComponents/ErrorComponents/ErrorMessage';

class UpdateAdherent extends React.Component{
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
                telephone: ""
            },
            error: false,
            redirect: false
        }        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    componentDidMount(){
        axios.get('/api/adherent/find/' + this.props.match.params.id)
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
                telephone: ""
            }, error: "Une erreur est survenue.", redirect: false});
        });
    }

    handleChange(id, text){
        const state = this.state;
        state.user[id] = text;
        this.setState(state);
    }

    handleSubmit(e){
        axios.post('/api/adherent/update', this.state.user)
        .then((response) => {
            console.log(response);
            this.setState({redirect: "/adherent/show/" + response.data.userId});
        })
        .catch(err => {
            const state = this.state;
            state.error = err.response.data.error;
            this.setState(state);
        });

        e.preventDefault();
    }

    render(){
        
        if(this.state.redirect){ return <Redirect to={this.state.redirect}/> }

        return(
            <div id="employe-wrapper">
                <h3>Modifier un adhérent</h3>
                {this.state.error && <ErrorMessage message={this.state.error} level="danger"/>}
                <div id="employe-form-wrapper">
                    <form onSubmit={this.handleSubmit} id="employe-form">
                        <div className="form-row">
                            <TextInput  focus={true} id="nom" name="Nom" type="text" onChange={this.handleChange} value={this.state.user.nom} required="required" col="col-md-6" label={true}/>
                            <TextInput id="prenom" name="Prenom" type="text" onChange={this.handleChange} value={this.state.user.prenom} required="required" col="col-md-6" label={true}/>
                        </div>
                        <div className="form-row">
                            <SelectInput id="sexe" name="Sexe" value={this.state.user.sexe} onChange={this.handleChange} options={["H","F"]} col="col-md-4"/>
                            <DateInput  id="dob" name="Date de naissance" value={this.state.user.dob} onChange={this.handleChange} col="col-md-4"/>
                            <TextInput id="telephone" name="Téléphone" type="text" onChange={this.handleChange} label={true}
                                value={this.state.user.telephone} required="required" col="col-md-4"/>
                        </div>
                        <div className="form-row">
                            <TextInput id="pseudo" name="Pseudo" type="text" onChange={this.handleChange} 
                            value={this.state.user.pseudo} required="required" col="col-md-12" label={true}/>
                        </div>        
                        <div id="employe-form-button-wrapper"><SubmitButton name="Enregistrer"/></div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateAdherent;
