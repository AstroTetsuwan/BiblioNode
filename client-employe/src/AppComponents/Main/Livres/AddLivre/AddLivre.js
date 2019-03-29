import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import TextInput from '../../../../ReusableComponents/FormsComponents/TextInput';
import SelectInput from '../../../../ReusableComponents/FormsComponents/SelectInput';
import SubmitButton from '../../../../ReusableComponents/FormsComponents/SubmitButton';
import ErrorMessage from '../../../../ReusableComponents/ErrorComponents/ErrorMessage';
import AuteurInputs from './AuteurInputs';

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
            editeurOptions: {full:  [], displayed: []},
            themeOptions: {full:  [], displayed: []}
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addAuteurInput = this.addAuteurInput.bind(this);
        this.removeAuteurInput = this.removeAuteurInput.bind(this);
        this.handleAuteurSecondaireChange = this.handleAuteurSecondaireChange.bind(this);
    }

    componentDidMount(){
        this.loadThemes();
        this.loadEditeurs();
    }

    loadThemes(){
        axios.get('/api/book/theme/findAll')
        .then(response => {
            const state = this.state;
            state.themeOptions.full = response.data.results;
            state.livre.theme = response.data.results[0].libelle;
            state.themeOptions.displayed = response.data.results.map(theme => theme.libelle);
            this.setState(state);
        })
        .catch(err => console.log(err));
    }

    loadEditeurs(){
        axios.get('/api/book/editeur/findAll')
        .then(response => {
            const state = this.state;
            state.editeurOptions.full = response.data.results;
            state.livre.editeur = response.data.results[0].nom;
            state.editeurOptions.displayed = response.data.results.map(editeur => editeur.nom);
            this.setState(state);
        })
        .catch(err => console.log(err));
    }

    handleChange(id, text){
        const state = this.state;
        state.livre[id] = text;
        this.setState(state);
    }

    handleSubmit(e){        
        let livre = this.buildBookToPost();
        axios.post('/api/book/add', livre)
        .then(response => this.setState({redirect: "/livre/show/" + response.data.livreId}))
        .catch(error => this.setState({error: error}));
        e.preventDefault();
    }

    buildBookToPost(){
        let editeurLivreId = -1;
        this.state.editeurOptions.full.forEach(editeur => {  if(editeur.nom === this.state.livre.editeur){ editeurLivreId = editeur.id; } });

        let themeLivreId = -1;
        this.state.themeOptions.full.forEach(theme => { if(theme.libelle === this.state.livre.theme){ themeLivreId = theme.code; } });

        let auteurs = [{nom: this.state.livre.auteurPrincipalNom, prenom: this.state.livre.auteurPrincipalPrenom}];
        this.state.livre.auteursSecondaires.forEach(auteur => auteurs.push(auteur));

        return {
            titre: this.state.livre.titre,
            anneeParution: this.state.livre.anneeParution,
            auteurs: auteurs,
            idEditeur: editeurLivreId,
            isbn: this.state.livre.isbn,
            nbPages: this.state.livre.nbPages,
            codeTheme: themeLivreId,
        };
    }

    addAuteurInput(){
        const state = this.state;
        state.livre.auteursSecondaires.push({nom: "", prenom: ""});     
        this.setState(state);    
    }

    removeAuteurInput(index){
        const state = this.state;
        state.livre.auteursSecondaires.splice(index, 1);
        this.setState(state);
    }
    
    handleAuteurSecondaireChange(id, text){
        let nomOrPrenom = id.split('-')[1];
        let auteurIndex = id.split('-')[2];
        const state = this.state;
        state.livre.auteursSecondaires[auteurIndex][nomOrPrenom] = text;
        this.setState(state);
    }

    render(){
     
        if(this.state.redirect){ return <Redirect to={this.state.redirect}/> }

        return(
            <div>
                <h3 style={{marginBottom: "3vh"}}>Ajouter un livre</h3>

                {this.state.error && <ErrorMessage message={this.state.error} level="success"/>}

                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">                       
                        <h4>Détails livre:</h4>
                            <TextInput label={true}  focus={true} id="titre" name="Titre" type="text"
                                    onChange={this.handleChange} value={this.state.livre.titre} required="required" col="col-md-12"/>
                            <TextInput label={true} id="isbn" name="ISBN" type="text"
                                    onChange={this.handleChange} value={this.state.livre.isbn} required="required" col="col-md-12"/> 
                            <TextInput label={true} id="nbPages" name="Nombre de pages" type="text" maxLength={4}
                                    onChange={this.handleChange} value={this.state.livre.nbPages} required="required" col="col-md-12"/> 
                                        
                            <SelectInput id="editeur" name="Éditeur" value={this.state.livre.editeur} onChange={this.handleChange} 
                                options={this.state.editeurOptions.displayed} col="col-md-12"/>
                            <SelectInput id="theme" name="Thème" value={this.state.livre.theme} onChange={this.handleChange} 
                                options={this.state.themeOptions.displayed} col="col-md-12"/>
                            <TextInput label={true} id="anneeParution" name="Année de parution" type="text" maxLength={4}
                                    onChange={this.handleChange} value={this.state.livre.anneeParution} required="required" col="col-md-12"/> 
                        </div>
                        <div className="col-md-6">
                            <h4>Auteur(s):</h4>
                            <AuteurInputs idNom="auteurPrincipalNom"  idPrenom="auteurPrincipalPrenom" 
                                nom={this.state.livre.auteurPrincipalNom} prenom={this.state.livre.auteurPrincipalPrenom}  
                                onChange={this.handleChange} auteurPrincipal={true} addAuteurInput={this.addAuteurInput} />  
                            <div>                                                
                                 {this.state.livre.auteursSecondaires.map(
                                     (aut, i) => <AuteurInputs idNom={"auteur-nom-" + i}  idPrenom={"auteur-prenom-" + i} key={i}
                                     nom={aut.nom} prenom={aut.prenom}  
                                     onChange={this.handleAuteurSecondaireChange} auteurPrincipal={false} addAuteurInput={this.addAuteurInput} removeAuteurInput ={this.removeAuteurInput}/>
                                 )}
                            </div>  
                        </div>
                    </div>
                    <div style={{paddingLeft: "15px"}}><SubmitButton name="Enregistrer"/></div>
                </form>
            </div>
        );
    }

}

export default AddLivre;