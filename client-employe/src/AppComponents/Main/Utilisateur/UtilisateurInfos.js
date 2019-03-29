import React from 'react';


function UtilisateurInfos(props){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return(
        <div className="row" style={{fontSize:"1.2em"}}>
                    <div className="col-md-6">
                        <p>Nom: {props.user.nom}</p>
                    </div>
                    <div className="col-md-6">
                        <p>Prénom: {props.user.prenom}</p>
                    </div>
                    
                    <div className="col-md-6">
                        <p>Date de naissance: {new Date(props.user.dob).toLocaleDateString('fr-FR', options)}</p>
                    </div>
                    <div className="col-md-6">
                        <p>Sexe: {props.user.sexe}</p>
                    </div>
                    <div className="col-md-12">
                        <p>Pseudo: {props.user.pseudo}</p>
                    </div>
                {props.user.categorieUtilisateur === 'EMPLOYE' &&
                    <div>
                        <div className="col-md-6">
                            <p>Catégorie employé: {props.user.categorieEmploye}</p>
                        </div>
                        <div className="col-md-6">
                            <p>Matricule: {props.user.matricule}</p>
                        </div>
                    </div>
                }
                {props.user.categorieUtilisateur === 'ADHERENT' &&
                    <div>
                        <div className="col-md-6">
                            <p>Téléphone: {props.user.telephone}</p>
                        </div>
                        <div className="col-md-6">
                            <p>Date de paiement cotisation: {new Date(props.user.dateCotisation).toLocaleDateString('fr-FR', options)}</p>
                        </div>
                    </div>
                }
        </div>
    );
}

export default UtilisateurInfos;