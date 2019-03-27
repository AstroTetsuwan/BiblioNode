import React from 'react';

import DropDownSection from '../../../ReusableComponents/NavComponents/DropDownSection';
import GreetingLogout from './GreetingLogout';
import './Nav.css';

function Nav(props){

    //BIBLIOTHECAIRE LEVEL
    let adherentsDDElements = [{name: 'Inscription', link: "/adherent/add"}, {name: 'Rechercher', link: "/adherent/search"}];
    let pretsRetoursElements = [{name: 'Enregistrer un prêt', link: "/"}, {name: 'Enregistrer un retour', link: "/"}];
    let livresElements = [{name: 'Rechercher', link: "/"}];
    let employesElements = [];
    let statsElements = [];

    //ADD THE RESTRICTED LEVEL PARTS IF NEEDED
    if(props.user.categorieEmploye === 'RESPONSABLE'){
        employesElements.push({name: 'Ajouter', link: "/employe/add"});
        employesElements.push({name: 'Liste des employés', link: "/employe/list"});
        statsElements.push({name: 'Random stats', link: "/"})
    }
    if(props.user.categorieEmploye === 'RESPONSABLE' || props.user.categorieEmploye === 'GESTIONNAIRE'){
        livresElements.push({name: 'Ajouter', link: "/livre/add"});
        livresElements.push({name: 'Ajouter un thème', link: "/theme/add"}); 
    }

    return(
        <nav>
            <GreetingLogout user={props.user}/>
            <ul id="nav-links-wrapper">
                <DropDownSection top={{name:"Accueil", link:"/"}}/>
                <DropDownSection top={{name:"Adhérents", link:"/adherent/search"}} dropDownElements={adherentsDDElements}/>   
                <DropDownSection top={{name:"Prêts & retours", link:"/"}} dropDownElements={pretsRetoursElements}/>
                <DropDownSection top={{name:"Livres", link:"/"}} dropDownElements={livresElements}/>   
                
                {props.user.categorieEmploye === 'RESPONSABLE' &&
                    <DropDownSection top={{name:"Employés", link:"/employe/list"}} dropDownElements={employesElements}/> 
                }
                {props.user.categorieEmploye === 'RESPONSABLE' &&
                    <DropDownSection top={{name:"Statistiques", link:"/"}} dropDownElements={statsElements}/> 
                }             
                             
                     
            </ul>
        </nav>
    );
}

export default Nav;