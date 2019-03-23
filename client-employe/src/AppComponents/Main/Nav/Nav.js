import React from 'react';

import DropDownSection from '../../../ReusableComponents/NavComponents/DropDownSection';
import GreetingLogout from './GreetingLogout';
import './Nav.css';

function Nav(props){

    //BIBLIOTHECAIRE LEVEL
    let adherentsDDElements = [{name: 'Inscription', link: "/"}, {name: 'Rechercher', link: "/"}];
    let pretsRetoursElements = [{name: 'Enregistrer un prêt', link: "/"}, {name: 'Enregistrer un retour', link: "/"}];
    let livresElements = [{name: 'Rechercher', link: "/"}];
    let employesElements = [];
    let statsElements = [];

    //ADD THE RESTRICTED LEVEL PARTS IF NEEDED
    if(props.user.categorieEmploye === 'RESPONSABLE'){
        adherentsDDElements.push({name: 'Supprimer', link: "/"});
        employesElements.push({name: 'Ajouter', link: "/employe/add"});
        employesElements.push({name: 'Liste des employés', link: "/"});
        statsElements.push({name: 'Random stats', link: "/"})
    }
    if(props.user.categorieEmploye === 'RESPONSABLE' || props.user.categorieEmploye === 'RESPONSABLE'){
        livresElements.push({name: 'Ajouter', link: "/"});
    }

    return(
        <nav>
            <GreetingLogout user={props.user}/>
            <ul id="nav-links-wrapper">
                <DropDownSection top={{name:"Accueil", link:"/"}}/>
                <DropDownSection top={{name:"Adhérents", link:"/"}} dropDownElements={adherentsDDElements}/>   
                <DropDownSection top={{name:"Prêts & retours", link:"/"}} dropDownElements={pretsRetoursElements}/>
                <DropDownSection top={{name:"Livres", link:"/"}} dropDownElements={livresElements}/>   
                
                {props.user.categorieEmploye === 'RESPONSABLE' &&
                    <DropDownSection top={{name:"Employés", link:"/"}} dropDownElements={employesElements}/> 
                }
                {props.user.categorieEmploye === 'RESPONSABLE' &&
                    <DropDownSection top={{name:"Statistiques", link:"/"}} dropDownElements={statsElements}/> 
                }             
                             
                     
            </ul>
        </nav>
    );
}

export default Nav;