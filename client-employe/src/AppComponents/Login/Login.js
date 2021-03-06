import React from 'react';
import axios from 'axios';

import SubmitButton from '../../ReusableComponents/FormsComponents/SubmitButton';
import TextInput from '../../ReusableComponents/FormsComponents/TextInput';

import ErrorMessage from '../../ReusableComponents/ErrorComponents/ErrorMessage';

import './Login.css'

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: "",
            error: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(id, text){
        const state = this.state;
        state[id] = text;
        this.setState(state);
    }

    handleSubmit(e){
        axios.post('/api/employe/login',{
            username: this.state.username,
            password: this.state.password
        })
        .then((response) => {
            let user = response.data;
            if(user.categorieUtilisateur === "EMPLOYE"){ this.props.handleLogin(user); }
            else{ this.setErrorMessage("Cet utilisateur n'est pas autorisé."); }
        })
        .catch((err) => {
            if(err.response.data.error){  this.setErrorMessage(err.response.data.error);  }
            else{ this.setErrorMessage("Une erreur est survenue lors de la requête au serveur. Vérifiez votre connexion au réseau."); }         
        });
        e.preventDefault();
    }

    setErrorMessage(message){
        const state = this.state;
        state.error = message;
        this.setState(state);
    }

    render(){
        return(
            <div id="login-wrapper">
                <h2 id="login-title">Bibliothèque des Marmots</h2>

                {this.state.error && <ErrorMessage message={this.state.error} level="danger"/> }

                <form onSubmit={this.handleSubmit} id="login-form">
                    <TextInput id="username" name="Pseudo" type="text" onChange={this.handleChange} value={this.state.username} required="required" label={true}  focus={true}/>                    
                    <TextInput id="password" name="Mot de Passe" type="password" onChange={this.handleChange}  value={this.state.password} required="required" label={true}/>
                    <div id="login-form-button-wrapper"><SubmitButton name="Log in"/></div>
                </form>
            </div> 
        );
    }
}

export default Login;