import React from 'react';
import axios from 'axios';
import TextInput from '../../../../ReusableComponents/FormsComponents/TextInput';
import SelectInput from '../../../../ReusableComponents/FormsComponents/SelectInput';
import ErrorMessage from '../../../../ReusableComponents/ErrorComponents/ErrorMessage';

class AddLivre extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            livre: {
                titre:"",
                isbn: "",
                theme: "",
                editeur: "",
                nbPages: "",
                anneeParution: "",
                auteurPrincipalNom: "",
                auteurPrincipalPrenom: "",
                auteursSecondaires: []
            },
            editeurOptions: [],
            themeOptions: []
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
        
        e.preventDefault();
    }
    render(){
        return(
            <div>
                <h3>Ajouter un livre</h3>

                {this.state.success && <ErrorMessage message={this.state.success} level="success"/>}

                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <TextInput label={true}  focus={true} id="titre" name="Titre" type="text"
                                onChange={this.handleChange} value={this.state.livre.titre} required="required" col="col-md-4"/>
                        <TextInput label={true} id="isbn" name="ISBN" type="text"
                                onChange={this.handleChange} value={this.state.livre.isbn} required="required" col="col-md-4"/> 
                        <TextInput label={true} id="nbPages" name="Nombre de pages" type="text"
                                onChange={this.handleChange} value={this.state.livre.nbPages} required="required" col="col-md-4"/> 
                    </div>

                    <div className="row">                    
                        <SelectInput id="editeur" name="Éditeur" value={this.state.livre.editeur} onChange={this.handleChange} options={this.state.editeurOptions} col="col-md-4"/>
                        <SelectInput id="theme" name="Thème" value={this.state.livre.theme} onChange={this.handleChange} options={this.state.themeOptions} col="col-md-4"/>
                        <TextInput label={true} id="anneeParution" name="Année de parution" type="text" maxLength={4}
                                onChange={this.handleChange} value={this.state.livre.anneeParution} required="required" col="col-md-4"/> 
                    </div>
                </form>
            </div>
        );
    }

}

export default AddLivre;