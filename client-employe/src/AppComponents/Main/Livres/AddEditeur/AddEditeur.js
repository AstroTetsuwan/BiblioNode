import React from 'react';
import TextInput from '../../../../ReusableComponents/FormsComponents/TextInput';
import SubmitButton from '../../../../ReusableComponents/FormsComponents/SubmitButton';
import ErrorMessage from '../../../../ReusableComponents/ErrorComponents/ErrorMessage';

import axios from 'axios';

class AddEditeur extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            editeur: { nom: "", ville: "" }
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(id, text){
        const state = this.state;
        state.editeur[id] = text;
        this.setState(state);
    }

    handleSubmit(e){
        axios.post('/api/book/editeur/add', this.state.editeur)
        .then((response) => {
            this.setState({ 
                editeur: { nom: "", ville: "" },
                success: (response.data.error) ? response.data.error : "Éditeur enregistré."
                }, () => { window.setTimeout(() => {  this.setState({ editeur: { nom: "", ville: "" }, success: false});}, 2000);
            });
        })
        .catch((err) => { 
            const state = this.state;
            state.error = err.response.data.error;
            this.setState(state);
         });
        e.preventDefault();
    }

    render(){
        return(
            <div>
                <h3>Ajouter un éditeur</h3>
                {this.state.error && <ErrorMessage message={this.state.error} level="danger"/>}
                {this.state.success && <ErrorMessage message={this.state.success} level="success"/>}
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <TextInput label={true}  focus={true} id="nom" name="Nom" type="text"
                        onChange={this.handleChange} value={this.state.editeur.nom} required="required" col="col-md-6"/>                
                        <TextInput label={true} id="ville" name="Ville" type="text" 
                        onChange={this.handleChange} value={this.state.editeur.ville} required="required" col="col-md-6"/>
                        <div className="col-md-12"><SubmitButton name="Enregistrer"/></div>
                    </div>
                </form>
            </div>
        );
    }

}

export default AddEditeur;