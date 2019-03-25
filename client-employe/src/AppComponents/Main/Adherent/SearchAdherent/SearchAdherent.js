import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import SearchBar from '../../../../ReusableComponents/SearchComponents/SearchBar';
import ResultsPagination from '../../../../ReusableComponents/SearchComponents/ResultsPagination';
import SearchAdherentElement from './SearchAdherentElement';

import ErrorMessage from '../../../../ReusableComponents/ErrorComponents/ErrorMessage';
class SearchAdherent extends React.Component{
    constructor(props){
        super(props);
        this.state = { keywords: "", nbrPageOfResults: 0, currentPage: 0, users: []};

        this.search = this.search.bind(this);
        this.switchSearchResultsPage = this.switchSearchResultsPage.bind(this);
        this.handleAction = this.handleAction.bind(this);
    }

    search(keywords, page){
        axios.get('/api/adherent/search/' + keywords + "/" + page)
        .then((results) => {
            if(results.data.users.length > 0){
                this.setState({
                    keywords: keywords, 
                    nbrPageOfResults: Math.ceil(results.data.count / 10), 
                    users: results.data.users.map((user, i) => <SearchAdherentElement user={user} key={i}
                        deleteActive={this.props.user.categorieEmploye === "RESPONSABLE" ? true : false} handleAction={this.handleAction}/>),
                    pagination: results.data.count > 10 ? 
                        <ResultsPagination nbrButtons={Math.ceil(results.data.count / 10)} currentPage={page} handleClick={this.switchSearchResultsPage} /> : false
                });
            }
            else{
                this.setState({error: "La recherche n'a retourné aucun résultat."}, 
                () => { window.setTimeout(() => { this.setState({error: false}); }, 2000)} );
            }
        })
        .catch((err) => {console.log(err); this.setState({error: "Une erreur est survenue"}); });
    }
    
    switchSearchResultsPage(page){
        this.search(this.state.keywords, page);
    }

    handleAction(userId, action){
        const state = this.state;
        switch(action){
            case 'show':  state.redirectShow = true; break;
            case 'update':  state.redirectUpdate = true; break;
            case 'delete':   if(window.confirm("Confirmer la suppression de l'adhérent.")){ state.redirectDelete = true; } break;
            default:  state.redirectShow = true; break;
        }
        state.userId = userId;
        this.setState(state);
    }

    render(){
        if(this.state.error){ return <ErrorMessage message={this.state.error} level="danger"/> }
        
        if(this.state.redirectShow){  return <Redirect to={"/adherent/show/" + this.state.userId}/>; } 
        if(this.state.redirectUpdate){  return <Redirect to={"/adherent/update/" + this.state.userId}/>; }
        if(this.state.redirectDelete){  return <Redirect to={"/adherent/delete/" + this.state.userId}/>; }

        return(
            <div className="row">
                <div className="col-md-12" style={{margin: "0 1vw 0 10px"}}>
                    <h3>Rechercher un adhérent:</h3>
                    <SearchBar onSearch={this.search}/>
                    {this.state.error && <ErrorMessage message={this.state.error} level="danger"/>}
                    
                    {this.state.users.length > 0 &&    
                        <div className="row" style={{fontSize:"1.2em", fontWeight:"bold", marginBottom: "20px"}}>
                            <div className="col-md-2">Nom</div>
                            <div className="col-md-2">Prénom</div>
                            <div className="col-md-2">Sexe</div>
                            <div className="col-md-2">Date de naissance</div>
                            <div className="col-md-4">
                                <div className="row" style={{textAlign: "center"}}>
                                    <span className="col-md-4">Voir</span>
                                    <span className="col-md-4">Modifier</span> 
                                    {(this.props.user.categorieEmploye === "RESPONSABLE") && <span className="col-md-4">Supprimer</span>}
                                </div>
                            </div>
                        </div>
                    }
                    {this.state.users}
                    {this.state.pagination}
                </div>
            </div>
        );
    }
}

export default SearchAdherent;