import React from 'react';
import axios from 'axios';

class ShowLivre extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            livre:{
                titre: "",
                isbn: "",
                anneeParution: "",
                nbPages: "",
                editeur: "",
                theme: "",
                auteurs: [],
                exemplaires: []
            }
        };

        
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddExemplaire = this.handleAddExemplaire.bind(this);
        this.handleDeleteExemplaire = this.handleDeleteExemplaire.bind(this);
    }

    componentDidMount(){
        this.loadBookInfos();
    }

    loadBookInfos(){
        axios.get('/api/book/find/' + this.props.match.params.id)
        .then(response => {
            console.log(response.data.livre);
            const state = this.state;
            state.livre.titre = response.data.livre.titre;
            state.livre.isbn = response.data.livre.isbn;
            state.livre.anneeParution = response.data.livre.anneeParution;
            state.livre.nbPages = response.data.livre.nbPages;
            state.livre.editeur = response.data.livre.editeur.nom + " - " + response.data.livre.editeur.ville;
            state.livre.theme = response.data.livre.theme.code + " - " + response.data.livre.theme.libelle; 
            state.livre.auteurs = response.data.livre.auteur;
            state.livre.exemplaires = response.data.livre.exemplaires;
            this.setState(state);
        })
        .catch(err => console.log(err));
    }

    handleUpdate(){

    }

    handleDelete(){
        if(window.confirm("Confirmez la suppression du livre.")){
            
        }
    }

    handleAddExemplaire(){
        axios.get('/api/book/add-exemplaire/' + this.state.livre.isbn)
        .then(success => this.loadBookInfos())
        .catch(err => console.log(err));
    }

    handleDeleteExemplaire(e){
        axios.get('/api/book/delete-exemplaire/' + e.target.id.split('-')[1])
        .then(success => this.loadBookInfos())
        .catch(err => console.log(err));
    }

    render(){
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return(
            <div className="row" style={{fontSize: "1.2em"}}>
                <div className="col-md-6">
                    <div style={{borderBottom: "1px solid #ddd"}}>
                        <h3>Détails du livre</h3>
                        <p>Titre: {this.state.livre.titre}</p>
                        <p>ISBN: {this.state.livre.isbn}</p>
                        <p>Année de parution: {this.state.livre.anneeParution}</p>
                        <p>Nombre de pages: {this.state.livre.nbPages}</p>
                        <p>Éditeur: {this.state.livre.editeur}</p>
                        <p>Thème: {this.state.livre.theme}</p>
                    </div>
                    <div>
                        <h3>Auteur{this.state.livre.auteurs.length > 1 ? "s" : ""}</h3>
                        {this.state.livre.auteurs.map((auteur, i) => <p key={i}>{auteur.prenom} {auteur.nom}</p>)}
                    </div>
                </div>
                

                <div className="col-md-6">
                    <div style={{borderBottom: "1px solid #ddd"}}>
                        <h3>Exemplaires</h3>
                        {this.state.livre.exemplaires.length === 0 && <p>Aucun exemplaire en stock.</p>}

                        {this.state.livre.exemplaires.map(
                            (ex, i) => 
                            <p key={i} style={{borderBottom:"1px solid #ddd", margin: " 10px"}}>
                                <span style={{fontWeight:"bold"}}>Date d'achat: </span>{new Date(ex.dateAchat).toLocaleDateString('fr-FR', options)}
                                 - <span style={{fontWeight:"bold"}}> Status: </span>{ex.statusExemplaire} 

                                {(this.props.user.categorieEmploye === 'RESPONSABLE' || this.props.user.categorieEmploye === 'GESTIONNAIRE') && 
                                <button type="button" id={"deleteExemplaire-" + ex.id} style={{margin:"20px"}}
                                    className="btn btn-danger"  onClick={this.handleDeleteExemplaire}>Supprimer</button> }
                            </p>
                        )}

                        {(this.props.user.categorieEmploye === 'RESPONSABLE' || this.props.user.categorieEmploye === 'GESTIONNAIRE') && 
                            <button type="button" style={{margin:"20px 0"}}  className="btn btn-primary" onClick={this.handleAddExemplaire}>Ajouter un examplaire</button>
                        }
                    </div>

                    {(this.props.user.categorieEmploye === 'RESPONSABLE' || this.props.user.categorieEmploye === 'GESTIONNAIRE') && 
                        <div style={{marginTop:"20px"}}>
                            <button type="button" className="btn btn-warning" style={{marginRight:"20px"}} onClick={this.handleUpdate}>Modifier</button>
                            <button type="button" className="btn btn-danger"  onClick={this.handleDelete}>Supprimer</button>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default ShowLivre;